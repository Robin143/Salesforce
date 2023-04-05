@isTest
public class AccountProcessorTest{

  

  @isTest static void testFutureMethod(){
  
        Account testAccount = new Account();
        testAccount.Name='Test Account' ;
        insert testAccount;
        
        Contact cont = new Contact();
        cont.FirstName='Test';
        cont.LastName='Test';
        cont.Accountid= testAccount.id;
        insert cont;
        
        Test.startTest();
        Map<Id, Account> accMap = new Map<Id,Account>([SELECT Id,Name,(SELECT Id,Name FROM Contacts) FROM Account]);
        List<Id> accountIdLst = new List<Id>(accMap.keySet());
        AccountProcessor.countContacts(accountIdLst);
        Test.stopTest();
  
  }
}