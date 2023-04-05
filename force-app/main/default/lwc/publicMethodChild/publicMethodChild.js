import { LightningElement,track,api } from 'lwc';

export default class PublicMethodChild extends LightningElement {

    @track value = ['Red'];

    options =  [
            { label: 'Red Marker', value: 'Red' },
            { label: 'Blue Marker', value: 'Blue' },
            { label: 'Green Marker', value: 'Green' },
            { label: 'White Marker', value: 'White' },
        ];
    
    @api 
    selectCheckbox(checkBoxValue){
       
        const selectedCheckBox = this.options.find(checkbox =>{
            return checkBoxValue === checkbox.value;
        });
        if(selectedCheckBox){
            this.value = selectedCheckBox.value;
            return 'Checkbox selected';
        }
        return 'Checkbox not selected';
    }

}