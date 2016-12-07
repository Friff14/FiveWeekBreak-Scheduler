/**
 * Created by Tanner_2 on 11/28/2016.
 */
import { Component } from '@angular/core';

import { ISemester } from './semester';

@Component({
    moduleId: module.id,
    templateUrl: 'semester-list.component.html'
})
export class SemesterListComponent {
    semesters: ISemester[];
    pageTitle: string = 'Semester List';

    constructor(
        private _semesterService: SemesterService
    ){}

    ngOnInit(): void {
            this._semesterService.getSemesters()
                .subscribe(prefixes => this.semesters = semesters,
                error => console.log('get error: ', error));
    }
}