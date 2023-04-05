import { LightningElement } from 'lwc';

export default class LifeCycleChildHook extends LightningElement {
    connectedCallback(){
         throw new Error("Oops!!!! Something went wrong");
    }
}