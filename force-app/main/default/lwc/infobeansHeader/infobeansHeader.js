import { LightningElement,api,wire } from 'lwc';
import IMAGES from '@salesforce/resourceUrl/Infobeans_Resource';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class InfobeansHeader extends LightningElement {
    
    mainLogo = IMAGES;
    @api checkApplicationStatus;
    @wire(CurrentPageReference) pageReference;
    @api showButton;

    handleApplicationStatus(){
        this.checkApplicationStatus = true;
        fireEvent(this.pageReference,'redirect-to-application-status', this.checkApplicationStatus);
    }
    refreshComponent(){
        eval("$A.get('e.force:refreshView').fire();");
    }
}