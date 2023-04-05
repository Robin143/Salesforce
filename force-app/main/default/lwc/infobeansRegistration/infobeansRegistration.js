import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import pageUrl from '@salesforce/resourceUrl/recaptcha2';
import saveFiles from '@salesforce/apex/FileUploaderClass.saveFiles'
export default class InfobeansRegistration extends LightningElement {

    @api recordId;
    @api fields;

    
    @track fileUploaded = false; // Render template
    @track fileNamesArr = []; // Display file names
    filesArr = []; // Store read file objects to pass to Apex
    filePromises = []; // Called my Promise.all
    @track showSpinner = true;

    @track navigateTo;
    captchaWindow = null;

   

     captchaLoaded(evt){
        var e = evt;
        console.log(e.target.getAttribute('src') + ' loaded');
        if(e.target.getAttribute('src') == pageUrl){
            // You know that your captcha is loaded
        } 
    }

    listenForMessage(message){
        console.log(message);
    }

    connectedCallback() {
        this.fields = this.fields.split(',');
    }

    handleChange(event){
        let email = event.target.value;
    }
    handleSubmit(event){
      event.stopPropagation();       // stop the form from submitting
      const fields = event.detail.fields;
      console.log('Fields -->',fields);
      this.template.querySelector('lightning-record-edit-form').submit(fields);
   }
    
    successHandler(event){
        this.recordId = event.detail.id;
        console.log("message    "+this.recordId);
        //this.buildFile();
        
    }
     handleAddFiles(event) {
        if (event.target.files.length > 0) {

            // Validate file size
            for(let i = 0; i < event.target.files.length; i++) {
                let file = event.target.files[i]
                if(file.size > 1000000 ) {
                    // console.log('File too large, size: ' + file.size)
                    this.throwError(this.label.fileSizeError + ' ' + file.name); // Custom labels used
                    return;
                }
            }

            this.fileUploaded = true; // Show element
            if (this.isIdentificationRequired) { // Condition for multiple files
                for (let i = 0; i < event.target.files.length; i++) {
                    let file = event.target.files[i];
                    this.fileNamesArr.push({Name: file.name}); // Iterate html
                    this.filesArr.push(file);
                }
            } else { // Single file upload
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
                    freader.readAsDataURL(this.filesArr[i]); // reads file contents
                    freader.onload = f => {    // executes after successful read
                        let base64 = 'base64,';
                        let content = freader.result.indexOf(base64) + base64.length;
                        let fileContents = freader.result.substring(content);

                        resolve({ // returns a value after successful promise
                            Title: this.filesArr[i].name, // Store file name
                            VersionData: fileContents
                        })

                    };
                })
            this.filePromises.push(build); // filePromises called by Promise.all()
        }
        return Promise.all(this.filePromises) // Execute all file builds asynchronously
        .then(result => {
            this.handleSaveFiles(this.recordId, result) // Pass file objects to Apex
        }) 
    }

    handleSaveFiles(recordId, result) 
    {
        console.log('handleSaveFiles recordId: ' + recordId);
        saveFiles({ recordId: recordId, filesToInsert: result})
        .then(data => {            
            this.showInfoToast("Candidate registered successfully.","success","");
            this.fileNamesArray = [];
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
     handleReset( event ) {

        const inputFields = this.template.querySelectorAll( 'lightning-input-field' );
        if ( inputFields ) {
            inputFields.forEach( field => {
                field.reset();
            } );
        }

    }
 

    get acceptedFormats() {
        return ['.pdf', '.doc','.docx'];
    }
    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
    }
}