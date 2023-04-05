import { LightningElement } from 'lwc';

export default class DataTable extends LightningElement {

    data = [
        { id: '1', name: 'John Doe', email: 'johndoe@example.com' },
        { id: '2', name: 'Jane Smith', email: 'janesmith@example.com' },
        { id: '3', name: 'Bob Johnson', email: 'bobjohnson@example.com' },
    ];

    columns = [
        { label: 'ID', fieldName: 'id' },
        { label: 'Name', fieldName: 'name' },
        { label: 'Email', fieldName: 'email' },
        { type: 'action', typeAttributes: { rowActions: actions } }
    ];

    // Handle row actions
    handleRowAction(event) {
        // Handle row action logic here
    }
    
}