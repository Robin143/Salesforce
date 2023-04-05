import { LightningElement,api } from 'lwc';
export default class InfogramMessageTemplate extends LightningElement {
 
    @api messageTemplate;
    header;
    body;
    footer;

    renderedCallback() {
        this.header = this.messageTemplate.Header__c;
        this.body = this.messageTemplate.Body__c;
        this.footer = this.messageTemplate.Footer__c;
    }
}