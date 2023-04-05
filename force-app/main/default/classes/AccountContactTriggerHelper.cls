public class AccountContactTriggerHelper {

    public static void createAccount(List<Account> accounts){
        Account acc = [SELECT Id,Name FROM Account WHERE Name =:accounts[0].Name LIMIT 1];
        if(acc != null){
            Contact cont = [SELECT Id,Name, AccountId FROM Contact WHERE AccountId =: acc.Id LIMIT 1];
            cont.AccountId = accounts[0].Id;
            update cont;
        }else{
            Contact newCon = new Contact(FirstName='DHL',LastName = accounts[0].Name, AccountId = accounts[0].Id);
            insert newCon;
        }
    }
}