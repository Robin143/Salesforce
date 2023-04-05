({
	 
     doHandleSearchEvent : function(cmp, event, helper) {
        var searchParam = cmp.get('v.keyword');
        var action = cmp.get('c.getRecords');
        //cmp.set('v.showRcrdList', true);
        action.setParams({
            strObjName: cmp.get('v.objName'),
            strSearchText:cmp.get('v.keyword'),
            strFieldInSearch: cmp.get('v.fieldName')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var response = response.getReturnValue();
                cmp.set('v.recordList', response);
            }
        });
        $A.enqueueAction(action);
    }
    
})