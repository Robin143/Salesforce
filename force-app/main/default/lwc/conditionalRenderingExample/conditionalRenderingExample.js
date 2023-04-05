import { LightningElement, track } from 'lwc';

export default class ConditionalRenderingExample extends LightningElement {

    @track displayDiv = false;
    @track cityList = ['Jaipur','Delhi','Bhagalpur','Purnia'];

    showDivHandler(event){
        this.displayDiv = event.target.checked;
    }
}