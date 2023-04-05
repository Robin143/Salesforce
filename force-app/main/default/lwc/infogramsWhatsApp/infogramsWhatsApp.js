import { LightningElement,track,wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendMessage from '@salesforce/apex/InfogramWhatsAapWebHook.sendMessage';
import getGroups from '@salesforce/apex/InfogramWhatsAapWebHook.getAllGrouops';
import {CurrentPageReference} from 'lightning/navigation';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'DeveloperName', fieldName: 'DeveloperName' }
];

export default class InfogramsWhatsApp extends LightningElement {

    // @track mobileNumber;
    // @track groups=[];
    // isShowModal=false;
    // @api showButton;
    // @api showGroups;

    data = [];
    columns = columns;

    //@wire(CurrentPageReference) pageRef;

    @wire(getGroups)
    wiredData({ error, data }) {
      if (data) {
        this.data = data;
      } else if (error) {
        console.error('Error:', error);
      }
    }
    // connectedCallback() {
    //     registerListener('show-groups',this.handleShowGroups,this);
    // }
    // handleShowGroups(payload){
    //     this.showGroups = payload;
    // }
    // handleViewMembers(){
    //     this.showGroups = true;
    // }
    //  hideModalBox() {  
    //     this.showGroups = false;
    // }

    // handleSendMessage(event){
    //     let grpId = event.target.dataset.id;
    //     sendMessage({ mobileNumber: grpId})
    //         .then(data => {            
    //             this.showInfoToast("Message sent successfully to  "+this.mobileNumber,"success","");
    //         })
    //         .catch(error => {
    //             this.showInfoToast("'An Error occurred  "+error.message,"error","");
    //     });
    // }
    // handleChange(event){
    //     this.mobileNumber = event.target.value;
    // }
    // showInfoToast(title, varient, message) {
    //     const evt = new ShowToastEvent({
    //         title: title,
    //         message: message,
    //         variant: varient,
    //         mode: 'dismissable'
    //     });
    //     this.dispatchEvent(evt);
    // }
}