/**
 * Created by Tanner_2 on 12/5/2016.
 */
import { Component } from '@angular/core';

import { ICampus } from './campus';

@Component({
    moduleId: module.id,
    templateUrl: 'campus-list.component.html'
})
export class CampusListComponent {
    campuses: ICampus[];
    pageTitle: string = 'Campus List';
}