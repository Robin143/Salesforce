import { LightningElement } from 'lwc';
export default class HclMsn extends LightningElement {
    connectedCallback() {
        this.template.querySelector("msn")
    }
}