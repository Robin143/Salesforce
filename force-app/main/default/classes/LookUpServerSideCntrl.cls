public class LookUpServerSideCntrl {

    @AuraEnabled
    public static List<SObject> getRecords(String strObjName, String strSearchText, String strFieldInSearch){
        String strSearchkey = '%'+strSearchText+'%';
        String strQuery = 'SELECT Id, '+strFieldInSearch+' FROM ';
        List<SObject> lstSobjRecord;
        if(strObjName != null){
        	strQuery += strObjName+' WHERE '+strFieldInSearch+' LIKE :strSearchkey';    
            lstSobjRecord = Database.query(strQuery);
        }
        return lstSobjRecord;
    }
}