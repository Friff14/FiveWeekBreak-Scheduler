/**
 * Created by Tanner_2 on 11/27/2016.
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { SemesterService } from './semester.service';

@Component({
    selector: 'semester-form',
    moduleId: module.id,
    templateUrl: 'semester-form.component.html'
})
export class SemesterFormComponent {
    pageTitle: string = 'Semester Form';
    constructor(
        private semesterService: SemesterService,
        private location: Location
    ){}

    goBack(): void {
        this.location.back();
    }
}