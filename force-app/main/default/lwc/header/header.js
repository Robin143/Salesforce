import { LightningElement } from 'lwc';
import css from '@salesforce/resourceUrl/css';
export default class Header extends LightningElement {

    connectedCallback() {
        loadStyle(this, css); 
        //you can add a .then().catch() if you'd like, as loadStyle() returns a promise
    }

}