trigger CheckEmailAndPhoneDuplication on Infobeans_UserRegistration__c (Before insert, Before update,After insert) {
    if(Trigger.isBefore && Trigger.isInsert){
        validatePhoneAndEmail.checkPhoneAndEmailValdation(Trigger.new);
    }
   if(Trigger.isAfter && Trigger.isInsert){
        validatePhoneAndEmail.sendWelcomeEmailToNewUser(Trigger.new);
    } 
    
}