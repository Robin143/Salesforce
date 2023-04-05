public class AccountContactRecord {

    @AuraEnabled(cacheable=true)
    public static List<Account> fetchContactRelatedToContact(){
        List<Account> lsAccounts = [SELECT Id,Name,(SELECT Id,Name FROM Contacts LIMIT 10) FROM Account LIMIT 10];
        return lsAccounts;
    }
}