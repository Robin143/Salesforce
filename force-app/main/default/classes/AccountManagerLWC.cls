/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-28-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-28-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class AccountManagerLWC {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer numberOfAccounts){
        try {
            return [SELECT Id,Name,Phone FROM Account LIMIT :numberOfAccounts];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}