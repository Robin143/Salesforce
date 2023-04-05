public class AccountProcessor{

    @future
    public static void countContacts(List<Id> accountIds){
        List<Account> accLst = [SELECT Id,Name,(SELECT Id,Name FROM Contacts WHERE AccountId IN :accountIds) FROM Account WHERE Id IN :accountIds];
        for(Account acc : accLst){
             if(acc.Contacts.size()>0){
               acc.Number_of_Contacts__c = acc.Contacts.size();
             }
        }
        if(accLst.size() > 0){
            update accLst;
        }
    }
}