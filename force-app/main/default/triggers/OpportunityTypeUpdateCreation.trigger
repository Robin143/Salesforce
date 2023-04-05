trigger OpportunityTypeUpdateCreation on OpportunityLineItem (before insert) {
	if(Trigger.isBefore){
        Creation.updateOpptunityType(Trigger.new);
    }
}