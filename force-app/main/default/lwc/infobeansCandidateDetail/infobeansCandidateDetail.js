import { LightningElement,api,wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class InfobeansCandidateDetail extends LightningElement {

    @api basicDetailsfields;
    @api profileHighlightfields;
    @api walkinFields;
    @api joiningField;
    @api recordId;
    @api isRecordIdPresent;
    @api youtube;
    
    @api checkApplicationStatus;
    @wire(CurrentPageReference) pageReference;

    handleApplicationStatus(){
        this.checkApplicationStatus = true;
        fireEvent(this.pageReference,'redirect-application-status', this.checkApplicationStatus);
    }
}