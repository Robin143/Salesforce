<aura:application extends="force:slds">
 <!--   <c:expensescmp /> 
     <c:LookUp objectName="Contact"
                          field_API_text="Name"
                          field_API_val="Id"
                          limit="4"
                          field_API_search="Name"
                          lookupIcon="standard:contact" 
                          selItem="{!v.selItem}" 
                          placeholder="Enter space after text to search Contacts"
                          />  -->
    <c:NewLookCmp objName="Account" fieldName="Name" labelName="Name"/>
</aura:application>