import { LightningElement, track } from 'lwc';

export default class SampleCalculator extends LightningElement {

        @track currentResult;
        @track previousResults = [];
        @track showPreviousResults = false;
        
        firstNumber;
        secondNumber;

    numberChangeHandler(event){
        const inputBoxName = event.target.name;
        this.firstNumber = inputBoxName === 'firstNumber' ? event.target.value : this.firstNumber;
        this.secondNumber = inputBoxName === 'secondNumber' ? event.target.value : this.secondNumber;
    }
    addHandler(){
        const firstNum  = parseInt(this.firstNumber);
        const secondNum = parseInt(this.secondNumber);
       // this.currentResult = 'Result of '+ firstNum + ' + '+ secondNum +'is: '+ (firstNum+secondNum);
        this.currentResult = `Result of ${firstNum} + ${secondNum} is: ${firstNum+secondNum}`;
        this.previousResults.push(this.currentResult);
    }
    subtractHandler(){
        const firstNum  = parseInt(this.firstNumber);
        const secondNum = parseInt(this.secondNumber);
       // this.currentResult = 'Result of '+ firstNum + ' + '+ secondNum +'is: '+ (firstNum+secondNum);
        this.currentResult = `Result of ${firstNum} - ${secondNum} is: ${firstNum-secondNum}`;
        this.previousResults.push(this.currentResult);
    }
    multiplyHandler(){
        const firstNum  = parseInt(this.firstNumber);
        const secondNum = parseInt(this.secondNumber);
       // this.currentResult = 'Result of '+ firstNum + ' + '+ secondNum +'is: '+ (firstNum+secondNum);
        this.currentResult = `Result of ${firstNum} * ${secondNum} is: ${firstNum*secondNum}`;
        this.previousResults.push(this.currentResult);
    }
    divideHandler(){
        const firstNum  = parseInt(this.firstNumber);
        const secondNum = parseInt(this.secondNumber);
       // this.currentResult = 'Result of '+ firstNum + ' + '+ secondNum +'is: '+ (firstNum+secondNum);
        this.currentResult = `Result of ${firstNum} / ${secondNum} is: ${firstNum/secondNum}`;
        this.previousResults.push(this.currentResult);
    }
    showPreviousResultToggle(event){
        this.showPreviousResults = event.target.checked; 
    }
}