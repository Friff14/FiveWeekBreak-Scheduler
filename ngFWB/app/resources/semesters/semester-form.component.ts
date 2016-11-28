/**
 * Created by Tanner_2 on 11/27/2016.
 */
import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Semester } from './semester.model'
import {SemesterService} from "./semester.service";

@Component({
    selector: 'semester-form',
    moduleId: module.id,
    templateUrl: 'semester-form.component.html'
})
export class SemesterFormComponent {
    pageTitle: string = 'Add Semester';
    model = new Semester('Spring 2017', 20160109, 20160428);

    constructor(private semesterService: SemesterService) {
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        this.semesterService.postSemesterForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
    }

}