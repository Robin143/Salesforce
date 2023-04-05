import { LightningElement, track, api,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import pageUrl from '@salesforce/resourceUrl/recaptcha2';
import saveFiles from '@salesforce/apex/FileUploaderClass.saveFiles';
import {registerListener,unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class InfobeansCandidateRegistration extends LightningElement {

    @api recordId;
    @api basicDetailsfields;
    @api profileHighlightfields;
    @api walkinFields;
    @api joiningField;
    @track isRecordIdPresent;
    @api youtubeLink;

    @track checkApplicationStatus;

    @track mode;
    @track fileUploaded = false; 
    @track fileNamesArr = []; 
    filesArr = []; 
    filePromises = []; 
    @track showSpinner = true;
    @track isTermConditionAccepted = true;

    @track navigateTo;
    captchaWindow = null;

   
    @wire(CurrentPageReference) pageRef;

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleApplicationStatusCheck(payload){
        this.checkApplicationStatus = payload;
    }
    closeApplicationStatus(payload){
        this.checkApplicationStatus = payload;
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

    listenForMessage(message){
        console.log(message);
    }

    connectedCallback() {
        this.basicDetailsfields = this.basicDetailsfields.split(',');
        this.profileHighlightfields = this.profileHighlightfields.split(',');
        this.walkinFields = this.walkinFields.split(',');
        this.joiningField = this.joiningField.split(',');
        registerListener('redirect-to-application-status',this.handleApplicationStatusCheck,this);
        registerListener('close-application-status',this.closeApplicationStatus,this);
    }

    handleSubmit(event){
        
            event.stopPropagation();      
        const fields = event.detail.fields;
        console.log('Fields -->',fields);
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     
   }
    
    handleSuccess(event){
        this.recordId = event.detail.id;
        this.isRecordIdPresent = true;
        console.log("message    "+this.recordId);
        this.buildFile();
        
    }
     handleAddFiles(event) {
        if (event.target.files.length > 0) {
            for(let i = 0; i < event.target.files.length; i++) {
                let file = event.target.files[i]
                if(file.size > 1000000 ) {
                    // console.log('File too large, size: ' + file.size)
                    this.throwError(this.label.fileSizeError + ' ' + file.name); 
                    return;
                }
            }

            this.fileUploaded = true; 
            if (this.isIdentificationRequired) { 
                for (let i = 0; i < event.target.files.length; i++) {
                    let file = event.target.files[i];
                    this.fileNamesArr.push({Name: file.name}); 
                    this.filesArr.push(file);
                }
            } else {
                let file = event.target.files[0];
                this.fileNamesArray = [];
                this.fileNamesArr.push({Name: file.name});
                this.filesArr.push(file);
            }
        }
    }

    buildFile() { 
        for (let i = 0; i < this.filesArr.length; i++) {
            let build = new Promise((resolve, reject) => {
                    let freader = new FileReader();
                    freader.readAsDataURL(this.filesArr[i]); 
                    freader.onload = f => {   
                        let base64 = 'base64,';
                        let content = freader.result.indexOf(base64) + base64.length;
                        let fileContents = freader.result.substring(content);

                        resolve({
                            Title: this.filesArr[i].name, 
                            VersionData: fileContents
                        })

                    };
                })
            this.filePromises.push(build);
        }
        return Promise.all(this.filePromises) 
        .then(result => {
            this.handleSaveFiles(this.recordId, result) 
        }) 
    }

    handleSaveFiles(recordId, result) 
    {
        console.log('handleSaveFiles recordId: ' + recordId);
        saveFiles({ recordId: recordId, filesToInsert: result})
        .then(data => {            
            this.showInfoToast("Candidate registered successfully.","success","");
            this.fileNamesArray = [];
            this.handleReset();
            this.mode = true;
        })
        .catch(error => {
            const showError = new ShowToastEvent({
                title: 'Error!!',
                message: 'An Error occur while uploading the file. ' + error.message,
                variant: 'error',
            });
            this.dispatchEvent(showError);
        });
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
     handleReset() {

        const inputFields = this.template.querySelectorAll( 'lightning-input-field' );
        if ( inputFields ) {
            inputFields.forEach( field => {
                field.reset();
            } );
        }

    }
    hadleTermCondition(event){
        this.isTermConditionAccepted = !(event.target.value);
        console.log("terms::   "+ event.target.value);
    }
 

    get acceptedFormats() {
        return ['.pdf', '.doc','.docx'];
    }
   
}