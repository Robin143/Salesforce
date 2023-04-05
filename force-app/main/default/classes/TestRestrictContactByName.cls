@isTest
public class TestRestrictContactByName{

  @isTest static void checkLastName(){
      List<Contact> contactLst = new List<Contact>();
      contactLst.add(new Contact(FirstName='Test', LastName='INVALIDNAME'));
      contactLst.add(new Contact(FirstName='Test', LastName='NOTINVALIDNAME'));
      insert contactLst;
  }
}