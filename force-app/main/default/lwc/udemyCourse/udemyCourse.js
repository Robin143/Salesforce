import { LightningElement,track } from 'lwc';

export default class UdemyCourse extends LightningElement {
   @track dynamicGreeting = 'World';

   greetingChangeHandler(event){
       this.dynamicGreeting = event.target.value;

   }

}