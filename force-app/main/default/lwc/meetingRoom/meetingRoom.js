import { LightningElement,api, wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
export default class MeetingRoom extends LightningElement {
    @api meetingRoomInfo={roomName:'A-01',roomCapacity:'10'};
    @api showRoomInfo = false;
    @wire(CurrentPageReference) pageRef;

    tileClickHandler(){
        const tileClicked = new CustomEvent('tileclick',{detail:this.meetingRoomInfo,bubbles:true});
        this.dispatchEvent(tileClicked);
        fireEvent(this.pageRef,'pubsubtileclick', this.meetingRoomInfo);
    }
}