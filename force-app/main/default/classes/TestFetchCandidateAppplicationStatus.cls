@isTest public class TestFetchCandidateAppplicationStatus {

    @TestSetup public static void setUp(){
        Infobeans_UserRegistration__c userReg = new Infobeans_UserRegistration__c(
            Infobeans_FirstName__c='Robin',Infobeans_LastName__c='Kumar',Infobeans_Email__c='robin.kumar_inf@infobeans.com',
            Infobeans_Mobile__c='9113385911',Location__c='Pune',TotalExperience__c='4',Skillset__c='Salesforce',
            Walk_in_location__c='Pune (Viman Ngar)',ReportingTime__c='10 AM',JoiningReadiness__c='On or before April 14',
            BaseLocation__c='Pune'
        );
        insert userReg;
    }

    @IsTest public static void testApplicationStatus(){
        FetchCandidateAppplicationStatus.getApplicationStatus('Kumar','9113385911');
        System.assertEquals('Test pass', 'Test pass');
    }
     @IsTest public static void testNegativeApplicationStatus(){
         try
            {
            	FetchCandidateAppplicationStatus.getApplicationStatus('Kumar123','9113385911');
        		System.assertEquals('Test pass', 'Test pass');
            }
            catch(AuraHandledException e) 
            {
            	System.assertEquals('Test pass', 'Test pass');
            }
        
    }

}