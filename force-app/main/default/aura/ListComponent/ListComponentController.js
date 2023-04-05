({
   handleKeyUp: function (cmp, event) {
        var searchText = cmp.find('enter-search').get('v.value');
        //alert("Entered search key '" + searchText);
        var searchEvent = cmp.getEvent('LookUpSearchEvent');
        searchEvent.setParams({
            searchText: searchText
        });
        searchEvent.fire();
    },
	selectRecord : function(component, event, helper) {
		var selectedRecord = component.get("v.recordList")[event.currentTarget.getAttribute("id")];        
        alert(selectedRecord.Name);
        component.set("v.selectedRecord", selectedRecord);
        component.set("v.value", selectedRecord.Id);
	},
    setRecord : function(component, event, helper) {
        let record = component.get("v.recordList");
		record["label"] = record[component.get("v.labelField")];
        record["value"] = record[component.get("v.valueField")];
        component.set("v.recordList", record);
	}
})