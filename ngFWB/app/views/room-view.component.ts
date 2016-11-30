import { Component } from '@angular/core';

@Component({
    selector: 'room-view-app',
    moduleId: module.id,
    templateUrl: 'room-view.component.html'
})
export class RoomViewComponent {
    pageTitle: string = 'Current Schedule';
}