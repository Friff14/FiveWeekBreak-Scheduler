/**
 * Created by Tanner_2 on 12/5/2016.
 */
import { Component } from '@angular/core';

import { IBuilding } from './building';

@Component({
    moduleId: module.id,
    templateUrl: 'building-list.component.html'
})
export class BuildingListComponent {
    buildings: IBuilding[];
    pageTitle: string = 'Building List';
}