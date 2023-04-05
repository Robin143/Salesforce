/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-23-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   07-23-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public class dynamicMapController {
    
    @AuraEnabled
    public static string getAllOrder(){ 
        string query = 'select id,Name,GeoLocation__c,Description from account where GeoLocation__longitude__s != null and GeoLocation__latitude__s != null limit 10';
        string baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
        system.debug('query generated========= '+query);
        list< map<string,object>> markerList = new list< map<string,object>>();
        for(Account acc : Database.query(query)){          
            if(acc.GeoLocation__c != null){

                map<string,object> markerMap = new map<string,object>();
                markerMap.put('title', acc.name);
                markerMap.put('description',acc.Description != null ? acc.Description : '');
                map<string,object> addressMap = new map<string,object>();
                addressMap.put('Latitude',acc.GeoLocation__c.getLatitude());
                addressMap.put('Longitude',acc.GeoLocation__c.getLongitude());
                markerMap.put('location',addressMap);
                markerList.add(markerMap);  
            }
        }
        
        
        system.debug('marker lsit -======>>>>>>>>>>   '+JSON.serialize(markerList));  
        return JSON.serialize(markerList);  
        
    } 
}