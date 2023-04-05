import { LightningElement,track } from 'lwc';
import getAccounts  from '@salesforce/apex/AccountManagerLWC.getAccounts';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountManagerApex extends LightningElement {

    //@wire(getAccounts)
    @track accounts;
    @track numberOfAccounts;

    get isReponseRecieved(){
        if(this.accounts){
            return true;
        }
        return false;
    }
    numberOfAccountChangeHandler(event){
        this.numberOfAccounts = event.target.value;
    }
    getAccountsHandler(){
        getAccounts({numberOfAccounts: this.numberOfAccounts}).then(response =>{
            this.accounts = response;
            const toastEvent = ShowToastEvent({
                title : 'Account Records',
                message : this.numberOfAccounts + ' Accounts fetched successfully',
                varirant : 'success',
            });
            this.dispatchEvent(toastEvent);
        }).catch(error =>{
            console.error('Problem occured while fetching record. ', error.body.message);
            const toastEvent = ShowToastEvent({
                title : 'Error',            
                message : error.body.message,
                varirant : 'error',
            });
            this.dispatchEvent(toastEvent);
        })
    }
}