public class validatePhoneAndEmail {

    @AuraEnabled
    public static void checkPhoneAndEmailValdation(List<Infobeans_UserRegistration__c> userRegLst){

        List<Infobeans_UserRegistration__c> oldRec = [SELECT Id,Status__c,Infobeans_Email__c,Infobeans_Mobile__c FROM Infobeans_UserRegistration__c];
        for(Infobeans_UserRegistration__c userReg : oldRec){
            
            if(userReg != null && userReg.Infobeans_Mobile__c == userRegLst[0].Infobeans_Mobile__c){
                userRegLst[0].Infobeans_Mobile__c.addError('Mobile number already registred');
            }
            if(userReg != null && userReg.Infobeans_Email__c == userRegLst[0].Infobeans_Email__c){
                userRegLst[0].Infobeans_Email__c.addError('Email already registred');
            }
            userRegLst[0].Status__c = 'Submitted';
        }
    }
    @AuraEnabled
    public static void sendWelcomeEmailToNewUser(List<Infobeans_UserRegistration__c> userRegLst){
        String email='';
        String firstName = '';
        for (Infobeans_UserRegistration__c regUser : userRegLst) {
           email = regUser.Infobeans_Email__c;
           firstName =  regUser.Infobeans_FirstName__c;
        }
        String subject = 'Your Registration was successful';
        String body = 'Dear ' + firstName + ', <br><br>'; 
                body += 'Thank you for your interest in joining InfoBeans. Our representatives would review your submission and contact you regarding interview schedule. <br>';
                body += '<br><br>Cheers, <br>';
                body += 'InfoBeans HR';
        validatePhoneAndEmail.sendEmailService(email,body,subject); 
    }  
    @InvocableMethod
    public static void sendInterviewMail(List<Id> recordId){
        
        Infobeans_UserRegistration__c infoCandidate = [SELECT Id,Status__c,Infobeans_Email__c,Infobeans_FirstName__c,Walk_in_location__c,ReportingTime__c,Schedule_Time__c FROM Infobeans_UserRegistration__c WHERE Id=:recordId][0];
        if(infoCandidate.Status__c.equalsIgnoreCase('Scheduled')){
            String subject = 'Interview Scheduled';
            String body = 'Dear ' + infoCandidate.Infobeans_FirstName__c+ ', <br><br>'; 
            body +='Thank you for expressing your interest for joining InfoBeans family. We are happy to confirm you that your face to face interview is scheduled as below<br><br>';
            body +='Venue:'+ infoCandidate.Walk_in_location__c+'<br>';
            body +='Reporting time:'+ infoCandidate.Schedule_Time__c+'<br>';
            body +='<br>Kindly bring the following documents along with you in order to facilitae to share the Offer to you within 90 minutes<br>';
            body += '<br>       1. Aadhar';
            body += '<br>       2. PAN';
            body += '<br>       3. Current offer letter';
            body += '<br>       4. Latest payslip';
            body += '<br><br>Our office is in SEZ campus and as part of compliance you might be required to show your identity card at the gate.';
            body += '<br><br>Cheers, <br>';
            body += 'InfoBeans HR';
            validatePhoneAndEmail.sendEmailService(infoCandidate.Infobeans_Email__c,body,subject); 
        }
        
    }   

    private static void sendEmailService(String emailId, String mailBody, String subject){
            //get all email in the list
            List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            
            List<String> sendTo = new List<String>();
            sendTo.add(emailId);
            mail.setToAddresses(sendTo);

        
            // Step 3. Set email contents - you can use variables!
            mail.setSubject(subject); //Subject of the mail and the body of the mail
            
            mail.setHtmlBody(mailBody);
            
            // Step 4. Add your email to the master list
            mails.add(mail);
            // Step 5: Send all emails in the master list
            Messaging.sendEmail(mails);

    }
}