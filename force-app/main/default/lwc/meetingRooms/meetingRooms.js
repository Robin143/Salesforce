import { LightningElement, track } from 'lwc';

export default class MeetingRooms extends LightningElement {
    meetingRoomsInfo = [
        {roomName:'A-01',roomCapacity:'10'},
        {roomName:'A-02',roomCapacity:'20'},
        {roomName:'A-03',roomCapacity:'30'},
        {roomName:'B-01',roomCapacity:'40'},
        {roomName:'B-02',roomCapacity:'50'},
        {roomName:'B-03',roomCapacity:'60'},
        {roomName:'C-01',roomCapacity:'70'}
    ];
    @track selectedMeetingRoom;

    onTileSelectHandler(event){
        const meetinRoomInfo = event.detail;
        this.selectedMeetingRoom = meetinRoomInfo.roomName;
    }
    constructor(){
        super();
        this.template.addEventListener('tileclick', this.onTileSelectHandler.bind(this));
    }
}