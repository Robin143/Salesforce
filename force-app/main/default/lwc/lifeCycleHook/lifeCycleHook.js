import { LightningElement,api } from 'lwc';
import firstTemplate from './lifeCycleHook.html';
import secondTemplate from './lifecycleRender.html'
export default class LifeCycleHook extends LightningElement {

    @api templateNo = 'temp1';
    constructor(){
        super();
        console.log("Contrustor called");
    }
    connectedCallback(){
        console.log("Connected callback called");
    }
    disconnectedCallback(){
        console.log("Disconnected callback");
    }
    handleChangeTemplate(){
        console.log("Inside change template method 1");
        if(this.templateNo === 'temp1'){
            this.templateNo = 'temp2';
        }else{
            this.templateNo = 'temp1';
        }
    }
    render(){
        console.log("Inside render method");
        if(this.templateNo === 'temp1'){
            return firstTemplate;
        }else{
            return secondTemplate;
        }
    }

}