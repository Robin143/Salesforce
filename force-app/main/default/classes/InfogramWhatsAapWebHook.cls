global class InfogramWhatsAapWebHook {
    public static String webHookApi = 'https://graph.facebook.com/v13.0/109187421824507/messages';
    public static String webHookToken = 'EAAOByx2ddO8BADQBD8pFysDPMaIb387cmD7eTF1z3qfZBZADcSEfSrlvmM5qhSofgNyndPrPPAi91CdRTgpgSdsRuhL4ijZCQld1AYwztaGjQPUKyYTfSYcKj2UchbRsCFapVxFassQnL7KOsG6N4QMVevDaW3BUSJ5TDPrP2LRrljMTZBdDkqZCAd0u3sQQpnzulKX4WHwZDZD';
    public static String bodyJson = '{"messaging_product": "whatsapp","to": "919708360323","type": "template","template": {"name": "hello_world","language": {"code": "en_US"}}}';
    
   @AuraEnabled
    public static Map<String, Object> sendMessage(String mobileNumber, String templateName){
        Map<String, Object> res = new Map<String, Object>();
        if(String.isNotBlank(mobileNumber)){
            List<String> grpIds = mobileNumber.split(',');
            for(String grpId : grpIds){
                res = InfogramWhatsAapWebHook.webHookCallout(grpId, templateName);
            }
            
        }
        return res;
    }
    @AuraEnabled(cacheable=true)
    public static List<group> getAllGrouops(){
        List<group> groupRecList = [SELECT Id, Name, DeveloperName FROM Group WHERE Type = 'Regular'];
        Map<String,String> groupDetailsMap = new Map<String,String>();
        for(Group grp : groupRecList){
            groupDetailsMap.put(grp.Id, grp.Name);
        }
        return groupRecList;
    }
    @AuraEnabled(cacheable=true)
    public static List<InfogramTemplsate__mdt> getTemplates(){
         try{
            
            String query =  'SELECT DeveloperName,Label,Body__c,Footer__c,Header__c,WhatsApp_Approved_Template__c FROM InfogramTemplsate__mdt WITH SECURITY_ENFORCED';
                                 
            List<InfogramTemplsate__mdt> lsPageContent = Database.query(query);                                    
            
            SObjectAccessDecision decision = Security.stripInaccessible(AccessType.READABLE,lsPageContent);

            if (!decision.getModifiedIndexes().isEmpty()) {
                throw new AuraHandledException('Please contact Admin. You do not have permission to view templates');
            }

            return (List<InfogramTemplsate__mdt>)decision.getRecords();
            
        }catch (Exception e) {
            return null;
        }
    }
    public static String getNumbers(String groupId){
        Set<String> userIds = new Set<String>();
        List<String> userMobileNumbers = new List<String>();
        for (GroupMember GrpMem : [Select GroupId, UserOrGroupId From GroupMember Where GroupId =:groupId]){
            userIds.add(GrpMem.UserOrGroupId);
        }
    
        for(User usr : [Select MobilePhone From User Where Id =:userIds]){
            userMobileNumbers.add(usr.MobilePhone.replaceAll('\\(.*\\)', ''));
        }
        return userMobileNumbers[0];
    }   
    private static void logSentMessages(String templateName){
        // System.debug('Group Name ::: '+groupName);
        List<InfogramTemplsate__mdt> selectedTemplate =  [SELECT DeveloperName,Label,Body__c,Footer__c,Header__c,WhatsApp_Approved_Template__c FROM InfogramTemplsate__mdt WHERE DeveloperName=:templateName WITH SECURITY_ENFORCED];
       
        WhatsAppTemplate__c logMessage = new WhatsAppTemplate__c();
        logMessage.Header__c = selectedTemplate[0].Header__c;
        logMessage.Body__c =  selectedTemplate[0].Body__c;
        logMessage.Footer__c =  selectedTemplate[0].Footer__c;
        //logMessage.SendTo__c = groupName;

        insert logMessage;
    }

    public static Map<String, Object> webHookCallout(String mobileNumber,String templateName){
        Http restHandle = new Http();
        HttpResponse res = new HttpResponse();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(webHookApi);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setHeader('Authorization', 'Bearer ' + webHookToken);
        whatsAppBody body = new whatsAppBody();
        body.messaging_product='whatsapp';
        body.to = InfogramWhatsAapWebHook.getNumbers(mobileNumber);
        body.type = 'template';
        body.template.name = templateName;
        body.template.language.code = 'en_US';
        String jsonBody = JSON.serialize(body);
        request.setBody(jsonBody);
        request.setCompressed(true); 

        try {
                res = restHandle.send(request);
                Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
                results.put('body',jsonBody);
                InfogramWhatsAapWebHook.logSentMessages(templateName);
                return results;
            } catch(System.CalloutException e) {
                System.debug('Callout error: '+ e);
                System.debug(res.toString());
                return null;
            }
    }

   

    public class whatsAppBody {

        public  String messaging_product;
        public  String to;
        public  String type;
        public  Template template = new Template();
    }
    public class Language {
        public  String code;
    }

    public class Template {
        public  String name;
        public  Language language = new Language();
    }
}