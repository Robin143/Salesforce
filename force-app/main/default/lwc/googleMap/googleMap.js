import { LightningElement , track} from 'lwc';
 
import getAllOrder from '@salesforce/apex/dynamicMapController.getAllOrder'; 
 
export default class GoogleMap extends LightningElement {
   
    @track loaded = true;
 
    
    applyFilter(event) {
        this.loaded = false;
       
        window.console.log(event);
 
        getAllOrder()
            .then(result => {
                window.console.log(result);
                this.mapMarkers = JSON.parse(result);
                this.markersTitle = "Google Map Acc Record";
                this.orders = result;
                this.loaded = true;
            })
            .catch(error => {
                this.error = error;
                this.loaded = true;
            });
    }
}