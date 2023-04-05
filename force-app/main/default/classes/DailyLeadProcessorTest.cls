@isTest
private class DailyLeadProcessorTest {
    public static String CRON_EXP = '0 0 0 15 3 ? 2022';
    
    static testmethod void testScheduledJob() {
        List<Lead> leadLst = new List<Lead>();
       for (Integer i = 0; i < 200; i++) {
            leadLst.add(new lead(
                FirstName='Dream force'+i,LastName='Demo dreamforce',Company='Xyz Company'
            ));
        }
        insert leadLst;
        Test.startTest();
        String jobId = System.schedule('ScheduledApexTest',
            CRON_EXP, 
            new DailyLeadProcessor());   
        Test.stopTest();   
    }       
           
}