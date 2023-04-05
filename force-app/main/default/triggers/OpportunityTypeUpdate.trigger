trigger OpportunityTypeUpdate on Opportunity (before insert) {
    if(Trigger.isBefore){
        Creation.updateOpptunityType(Trigger.new);
    }
}