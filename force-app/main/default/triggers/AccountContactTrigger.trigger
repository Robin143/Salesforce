trigger AccountContactTrigger on Account (After insert, After update) {
    if(Trigger.isAfter){
        AccountContactTriggerHelper.createAccount(Trigger.new);        
    }
}