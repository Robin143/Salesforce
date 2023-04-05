@isTest public class TestFileUploader {
    
    public static void testInsert(){
        Infobeans_UserRegistration__c userReg = new Infobeans_UserRegistration__c(
            Infobeans_FirstName__c='Robin',Infobeans_LastName__c='Kumar',Infobeans_Email__c='robin.kumar_inf@infobeans.com',
            Infobeans_Mobile__c='9113385911',Location__c='Pune',TotalExperience__c='4',Skillset__c='Salesforce',
            Walk_in_location__c='Pune (Viman Ngar)',ReportingTime__c='10 AM',JoiningReadiness__c='On or before April 14',
            BaseLocation__c='Pune'
        );
        
        insert userReg;
    }
    @IsTest public static void testFileUpload(){
        TestFileUploader.testInsert();
        Infobeans_UserRegistration__c userReg = [SELECT Id,name FROM Infobeans_UserRegistration__c WHERE Infobeans_Email__c='robin.kumar_inf@infobeans.com'][0];
        string before = 'Testing base 64 encode';
        Blob beforeblob = Blob.valueOf(before);
        string paramvalue = EncodingUtil.base64Encode(beforeblob);
        FileUploaderClass.uploadFile(paramvalue,'Test.pdf',userReg.Id);
       	FileInfo inf = new FileInfo();
        inf.Title = 'Testing';
        inf.VersionData = beforeblob;
        List<Object> fileLst = new List<Object>();
        fileLst.add(inf);
        FileUploaderClass.saveFiles(userReg.Id,fileLst);
    }
    public class FileInfo {
        public String Title;
        public Blob VersionData;
    }
}