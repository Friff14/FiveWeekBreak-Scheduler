/**
 * Created by Tanner_2 on 12/5/2016.
 */
import { Component } from '@angular/core';

import { ICampus } from './campus';
import {CampusService} from "./campus.service";

@Component({
    moduleId: module.id,
    templateUrl: 'campus-list.component.html'
})
export class CampusListComponent {
    campuses: ICampus[];
    pageTitle: string = 'Campus List';
    
    constructor(
        private _campusService: CampusService
    ){}

    ngOnInit(): void {
            this._campusService.getCampuses()
                .subscribe(campuses => this.campuses = campuses,
                error => console.log('get error: ', error));
    }
}