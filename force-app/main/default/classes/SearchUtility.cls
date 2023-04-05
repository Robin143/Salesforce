/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-06-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Ver   Date         Author                               Modification
   1.0   08-06-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class SearchUtility {
    
    public static List<SObject> resultJson;

    @AuraEnabled
    public static string searchResult(String searchText){
        List<KeyValueHolder__mdt>  searchHelperLst = [SELECT Id,Label,QueryColumns__c,ObjectName__c From KeyValueHolder__mdt WHERE Label ='Field' WITH SECURITY_ENFORCED];
        String objName = !(searchHelperLst.isEmpty()) && searchHelperLst[0] != null ? searchHelperLst[0].ObjectName__c : '';
        String queryFields = !(searchHelperLst.isEmpty()) && searchHelperLst[0] != null ? searchHelperLst[0].QueryColumns__c : '';
        String query ='';
        query += String.isNotBlank(queryFields) &&  String.isNotBlank(objName) ?'SELECT Id,Name, '+ queryFields + ' FROM '+String.escapeSingleQuotes(objName) : '';
        query += String.isNotBlank(searchText) ? formClause(searchText):'';
        try{
            if(String.isNotBlank(query)){
                resultJson = Database.query(query+' WITH SECURITY_ENFORCED');
            }
            System.debug('resultJson formed:: '+resultJson);
            return !resultJson.isEmpty() ? JSON.serialize(resultJson):'';
        }catch(DmlException e){
            return e.getMessage();
        }
    }
    private static String formClause(String searchTextJSON){
        String whereClause='';
        SearchJson sj = SearchUtility.parse(searchTextJSON);
      
        for(SearchText clause : sj.filter){
            if(String.isNotBlank(whereClause)){
                whereClause += ' AND '+clause.field +' IN ('+SearchUtility.formatClauseValue(clause.value.split(','))+')';
            }else{
                whereClause += ' WHERE '+clause.field +' IN ('+SearchUtility.formatClauseValue(clause.value.split(','))+')';
            }
            
        }
        return whereClause;
    }
    public static String formatClauseValue(List<String> clauseValLst){
        String clauseVal = '';
        for(String val : clauseValLst){
            if(String.isNotBlank(clauseVal)){
                clauseVal += ',\''+val+'\'';
            }else{
                clauseVal ='\''+val+'\'';
            }
        }
        return clauseVal;
    }
    public class SearchJson {
        public List<SearchText> filter; 
    }
    public class SearchText {
        public String field;	
        public String value;
        public SearchText(String field, String value){
            this.field = field;
            this.value = value;
        }	
    }
    public static SearchJson parse(String json) {
        return (SearchJson) System.JSON.deserialize(json, SearchJson.class);
    }
}
/*
{
    "filter":[{
        "field":"CareerLevel__c",
        "value":"Feeder"
    }]
     resultJson formed:: (Contact:{Id=0032v00003kXyT5AAK, Name=Rajan Ranbir, FirstName=Rajan, LastName=Ranbir})
}
*/