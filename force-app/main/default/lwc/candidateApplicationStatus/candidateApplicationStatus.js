import { LightningElement ,track,api,wire} from 'lwc';
import pageUrl from '@salesforce/resourceUrl/recaptcha2';
import {registerListener,unregisterAllListeners,fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getApplicationStatus from'@salesforce/apex/FetchCandidateAppplicationStatus.getApplicationStatus';

export default class CandidateApplicationStatus extends LightningElement {

    @track showDetails;
    @api recordId;
    
    @track navigateTo;
    captchaWindow = null;

    @track checkApplicationStatus;

    @track lastName;
    @track mobileNumber;

    @wire(CurrentPageReference) pageRef;

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleApplicationStatusCheck(payload){
        this.checkApplicationStatus = payload;
        this.recordId = "";
        this.showDetails = false;
    }
    
    connectedCallback() {
        registerListener('redirect-to-application-status',this.handleApplicationStatusCheck,this);
        registerListener('redirect-application-status',this.handleApplicationStatusCheck,this);
    }
   
    constructor(){
        super();
        this.navigateTo = pageUrl;
        window.addEventListener("message", this.listenForMessage);
    }
    captchaLoaded(evt){
        var e = evt;
        console.log(e.target.getAttribute('src') + ' loaded');
        if(e.target.getAttribute('src') == pageUrl){
            //  captcha is loaded
        } 
    }
    handleLastName(event){
        this.lastName = event.target.value;
    }
    handleMobileNumber(event){
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

    handleRecordDetail(){
        if((this.lastName != undefined || this.lastName != "")  && (this.mobileNumber != undefined && this.mobileNumber != "") ){
            getApplicationStatus({ lastName: this.lastName, mobileNumber: this.mobileNumber }).then(result=>{
                this.showDetails = true;
                this.checkApplicationStatus = true;
                this.recordId = result;
            }).catch(error => {
                this.showInfoToast("Candidate details not found.","error","");
            })
        }else{
            this.showInfoToast("Please enter valid details.","error","");
        }
        
    }
    handleCloseStatusCheck(){
        this.checkApplicationStatus = false;
        fireEvent(this.pageRef,'close-application-status', this.checkApplicationStatus);
        this.refreshComponent();
    }
    refreshComponent(){
        eval("$A.get('e.force:refreshView').fire();");
    }
}