import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { IRoom } from './room';
import { RoomService } from './room.service';

@Component({
    moduleId: module.id,
    templateUrl: 'room-form.component.html'
})
export class RoomFormComponent {
    pageTitle: string = 'Add Form';
    constructor(
        private roomService: RoomService,
        private location: Location
    ) {}

    goBack(): void {
        this.location.back();
    }
}