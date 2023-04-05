/*
Lightning Component :

Develop a Lightning component to display any 10 accounts and any 10 contacts
 (or any other 2 objects either related or unrelated ). 

Display both accounts and contacts in a Single table with 2 different columns for each object. 
There should be only one aura iteration which should run over a single list returned by an Apex Method.*/

import { LightningElement,wire } from 'lwc';
import getAccountRecords from '@salesforce/apex/AccountContactRecord.fetchContactRelatedToContact'


const COLS = [{
    fieldName: 'Name',
    label: 'Account Name',
    _children: []
}
];

export default class AccountContactTable extends LightningElement {

    gridData;
    gridColumns = COLS;

    @wire(getAccountRecords)
    fetchAccountData({ error, data }) {
      if (data) {
        console.log('Data', data);
        this.gridData = data;
      } else if (error) {
        console.error('Error:', error);
      }
    }
}