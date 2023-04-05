@isTest
public class TestVerifyDate{

    @isTest static void checkDate(){
    
        VerifyDate.CheckDates(System.today(), System.today().addDays(25));
        VerifyDate.CheckDates(System.today(), System.today().addDays(35));   
    
    }

}