import { LightningElement,wire,track } from 'lwc';
import IMAGES from '@salesforce/resourceUrl/InfoImages';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendMessage from '@salesforce/apex/InfogramWhatsAapWebHook.sendMessage';
import getGroups from '@salesforce/apex/InfogramWhatsAapWebHook.getAllGrouops';
import {CurrentPageReference} from 'lightning/navigation';
import getTemplates from '@salesforce/apex/InfogramWhatsAapWebHook.getTemplates';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'DeveloperName', fieldName: 'DeveloperName'}
];

export default class InfogramTemplate extends LightningElement {
    
    userImg = IMAGES + "/WhatsAppImages/user.png";
    adminImg = IMAGES + "/WhatsAppImages/admin.webp";
    whatsAppImg = IMAGES + "/WhatsAppImages/whatsApp.jpeg";
    msgTemplates;
    header;
    body;
    footer;
    templateName;
    labelName=[];
    showGroups;
    @track mobileNumber;
    @track groups=[];
    isShowModal=false;
    showButton;
    selectedRows=[];

    dataRec = [];
    columns =  [
            { label: 'Name', fieldName: 'Name' },
            { label: 'DeveloperName', fieldName: 'DeveloperName'}
        ];
        


    @wire(CurrentPageReference) pageReference;

    allSelected(event) {
        if(this.selectedRows !== undefined){
            this.selectedRows = [];
        }
        this.selectedRows = this.template.querySelectorAll('lightning-input');
        for(let i = 0; i < selectedRows.length; i++) {
            if(selectedRows[i].type === 'checkbox') {
                selectedRows[i].checked = event.target.checked;
            }
        }
    }
    handleSingelSelection(event){
        let selectedGroup = event.target.dataset.id;
        let index = this.selectedRows.indexOf(selectedGroup);
        if(index === -1){
             this.selectedRows.push(selectedGroup);
        }else{
             this.selectedRows.pop(selectedGroup);
        }
       
    }

    @wire(getTemplates)
    wiredContacts({ error, data }) {
        if (data) {
            this.msgTemplates = data;
            this.header = this.msgTemplates[0].Header__c;
            this.body = this.msgTemplates[0].Body__c;
            this.footer = this.msgTemplates[0].Footer__c;
            this.templateName = this.msgTemplates[0].DeveloperName;
            this.labelName = this.msgTemplates[0].Label;
        } else if (error) {
           // this.error = error;
           // this.contacts = undefined;
        }
    }
    handleGroups(event){
        this.showGroups = true;
        this.fetchGroups();
    }
    handleCurrentTemplate(event){
        let tmplateID = event.target.dataset.id;
        this.msgTemplates.forEach(currentItem => {
            if(currentItem.Id === tmplateID){
                this.header = currentItem.Header__c;
                this.body = currentItem.Body__c;
                this.footer = currentItem.Footer__c;
                this.templateName = currentItem.DeveloperName;
            }
        });
        

    }
    //@wire(getGroups)
    fetchGroups() {
        getGroups()
            .then(result => {
                 this.dataRec = result;
            })
            .catch(error => {
               console.error('Error:', error);
            });
     
    }
    handleViewMembers(){
        this.showGroups = true;
    }
     hideModalBox() {  
        this.showGroups = false;
    }

    handleSendMessage(event){
        //let grpId = event.target.dataset.id;
        //this.labelName = event.target.dataset.name;
        let grpIds = this.selectedRows.toString();
        sendMessage({ mobileNumber: grpIds,templateName:this.templateName,groupName:this.labelName})
                .then(data => {            
                    this.showInfoToast("Message sent successfully","success","");
                    this.showGroups = false;
                })
                .catch(error => {
                    this.showInfoToast("'An Error occurred  "+error.message,"error","");
            });
        // this.selectedRows.forEach(grpId=>{
            
        // })
        
    }
    handleChange(event){
        this.mobileNumber = event.target.value;
    }
    showInfoToast(title, varient, message) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: varient,
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}