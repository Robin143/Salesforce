@isTest
public class TestCheckEmailAndPhoneDuplication {
     
    @isTest public static void testInsert(){
        Infobeans_UserRegistration__c userReg = new Infobeans_UserRegistration__c(
            Infobeans_FirstName__c='Robin',Infobeans_LastName__c='Kumar',Infobeans_Email__c='robin.kumar_inf@infobeans.com',
            Infobeans_Mobile__c='9113385911',Location__c='Pune',TotalExperience__c='4',Skillset__c='Salesforce',
            Walk_in_location__c='Pune (Viman Nagar)',ReportingTime__c='10 AM',JoiningReadiness__c='On or before April 14',
            BaseLocation__c='Pune'
        );
        insert userReg;
    }
    @isTest public static void testSendInterviewMail(){
        TestCheckEmailAndPhoneDuplication.testInsert();
        Infobeans_UserRegistration__c userReg = [SELECT Id,name FROM Infobeans_UserRegistration__c WHERE Infobeans_Email__c='robin.kumar_inf@infobeans.com'][0];
        
        List<Id> ids = new List<Id>();
        ids.add(userReg.Id);
        validatePhoneAndEmail.sendInterviewMail(ids);
    }
}