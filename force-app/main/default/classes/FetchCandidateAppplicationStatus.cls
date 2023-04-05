public class FetchCandidateAppplicationStatus {

    @AuraEnabled
    public static Id getApplicationStatus(String lastName, String mobileNumber){
        if(String.isNotBlank(lastName) && String.isNotBlank(mobileNumber)){
            List<Infobeans_UserRegistration__c> getReord = [SELECT Id,Name,Infobeans_LastName__c,Infobeans_Mobile__c FROM Infobeans_UserRegistration__c WHERE Infobeans_LastName__c =:lastName AND Infobeans_Mobile__c =:mobileNumber];
            
            if(getReord != null && !getReord.isEmpty()){
                return getReord[0].Id;
            }else{
                throw new AuraHandledException('Candidate details not found.');
            }
        }
        return null;
    }

}