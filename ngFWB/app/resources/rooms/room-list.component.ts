import { Component, OnInit } from '@angular/core';

import { IRoom } from './room';
import { RoomService } from './room.service';

@Component({
    moduleId: module.id,
    templateUrl: 'room-list.component.html'
})
export class RoomListComponent implements OnInit{
    rooms: IRoom[];
    pageTitle: string = 'Room List';

    constructor(
        private _roomService: RoomService
    ){}

    ngOnInit(): void {
        this._roomService.getRooms()
            .subscribe(rooms => this.rooms = rooms,
                error => console.log('get error: ', error));
    }
}