trigger ClosedOpportunityTrigger on Opportunity (After insert, After update) {
    
    List<Task> newTask = new List<Task>();
    for(Opportunity oppor : [SELECT Id,Name FROM Opportunity WHERE Id IN :Trigger.new AND StageName = 'Closed Won']){
        newTask.add(new Task(Subject = 'Follow Up Test Task', WhatId = oppor.Id));
    }
    if(newTask.size() > 0){
        insert newTask;
    }
}