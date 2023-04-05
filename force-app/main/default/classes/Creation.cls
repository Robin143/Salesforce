/*
 * Trigger Scenario:

Add a new picklist value 'Sponsor' to the type field on the Opportunity object.

Add a new picklist value 'Sponsor' to the family field on the Product2 object.
Scenario: When inserting an Opportunity Line Item, if any of the Opportunity Line Item's related Product contains "Sponsor" as a value for the "Product Family" field, then update the Parent Opportunity's "Type" field to "Sponsor".
Write a trigger for the same, not necessary to write the logic in class, just a simple trigger is more than enough.

Lightning Component :

Develop a Lightning component to display any 10 accounts and any 10 contacts (or any other 2 objects either related or unrelated ). 

Display both accounts and contacts in a Single table with 2 different columns for each object. There should be only one aura iteration which should run over a single list returned by an Apex Method.
 * */

public class Creation {
	
    public static void updateOpptunityType(List<OpportunityLineItem> oppLineItems){
        Set<Id> oppId = new Set<Id>();
        Set<Id> prodId = new Set<Id>();
        
        for(OpportunityLineItem oppProd : oppLineItems){
           oppId.add(oppProd.OpportunityId);
           prodId.add(oppProd.Product2Id);
        }
        List<Opportunity> lsOpp = [SELECT Id,Name, Type FROM Opportunity WHERE Id=:oppId];
        List<Product2> lsProd = [SELECT Id,Name,Family FROM Product2 WHERE Id=:prodId];
		Boolean toUpdateOppType = false;
        for(Product2 prod: lsProd){
            if(prod.Family.equalsIgnoreCase('Sponsor')){
                toUpdateOppType = true;
                break;
            }
        }
        if(toUpdateOppType){
            List<Opportunity> lsOppToUpdate = new List<Opportunity>();
            for(Opportunity opp:lsOpp){
                if(opp.Type != ''){
                    opp.Type = 'Sponsor';
                }
                lsOppToUpdate.add(opp);
            }
            update lsOppToUpdate;
        }
        
    }
}