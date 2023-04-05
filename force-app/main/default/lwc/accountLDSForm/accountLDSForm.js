import { LightningElement, track } from 'lwc';

export default class AccountLDSForm extends LightningElement {

    @track recordId;

    successHandler(event){
        this.recordId = event.detail.id;
    }
}