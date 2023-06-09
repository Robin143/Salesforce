public class ExpensesController {
 	@AuraEnabled
    public static List<Expense__c> getExpenses() {
        return [SELECT Id, Name, Amount__c, Client__c, Date__c, 
                       Reimbursed__c, CreatedDate 
                FROM Expense__c];
    }
    @AuraEnabled
    public static Expense__c saveExpense(Expense__c expense) {
        if(Schema.sObjectType.Contact.isUpdateable())
        	upsert expense;
        return expense;
    }
}