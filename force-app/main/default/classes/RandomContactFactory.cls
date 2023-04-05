public class RandomContactFactory{

    public static List<Contact> generateRandomContacts(Integer numOfContacts, String lastName){
        List<Contact> contactLst = new List<Contact>();
        for(Integer i =1; i <= numOfContacts ; i++){
          contactLst.add(new Contact(FirstName = 'Test'+i,LastName = lastName));
        }
        return contactLst;
    }
}