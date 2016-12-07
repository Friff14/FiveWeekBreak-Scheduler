/**
 * Created by Tanner_2 on 12/5/2016.
 */
import { Component } from '@angular/core';

import { IBuilding } from './building';
import {BuildingService} from "./building.service";

@Component({
    moduleId: module.id,
    templateUrl: 'building-list.component.html'
})
export class BuildingListComponent {
    buildings: IBuilding[];
    pageTitle: string = 'Building List';

    constructor(
       private _buildingService: BuildingService
    ){}

    ngOnInit(): void{
        this._buildingService.getBuildings()
            .subscribe(buildings => this.buildings = buildings,
            error => console.log('get error: ', error));
    }
}