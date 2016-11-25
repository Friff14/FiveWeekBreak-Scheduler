import { Component } from '@angular/core';

import { IRoom } from './room';

@Component({
    moduleId: module.id,
    templateUrl: 'room-list.component.html'
})
export class RoomListComponent {
    rooms: IRoom[];
    pageTitle: string = 'Room List';
}