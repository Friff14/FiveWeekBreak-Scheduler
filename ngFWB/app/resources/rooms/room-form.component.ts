import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { IRoom } from './room';
import { RoomService } from './room.service';
import {ICampus} from "../campuses/campus";
import {Room} from "./room.model";
import {Building} from "../buildings/building.model";
import {IBuilding} from "../buildings/building";
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'room-form',
    moduleId: module.id,
    templateUrl: 'room-form.component.html'
})
export class RoomFormComponent {
    pageTitle: string = 'Add Room';
    campuses: ICampus[];
    buildings: IBuilding[];
    model = new Room(null, '', null, null);
    id: number;


    constructor(
        private roomService: RoomService,
        private location: Location,
        private _route: ActivatedRoute) {}


    submitForm(form: NgForm) {
        console.log(this.model);
        if(this.id) {
            this.roomService.putRoomForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log ('error: ', err)
                )
        }
        else {
            this.roomService.postRoomForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log('error: ', err)
                )
        }
    }

    ngOnInit(): void {
        // this.roomService.getCampuses()
        //     .subscribe(campuses => this.campuses = campuses,
        //         error => console.log('get error: ', error));

        this.roomService.getBuildings()
                .subscribe(buildings => this.buildings = buildings,
                    error => console.log('get error: ', error));

        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = `Edit Prefix: ${this.id}`;


        }
    }

    goBack(): void {
        this.location.back();
    }
}