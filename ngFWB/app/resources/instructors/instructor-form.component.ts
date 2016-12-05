import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';

import { Instructor } from './instructor.model'
import {InstructorService} from "./instructor.service";

@Component({
    selector: 'instructor-form',
    moduleId: module.id,
    templateUrl: 'instructor-form.component.html'
})
export class InstructorFormComponent {
    pageTitle: string = 'Add Instructor';
    testItems = ['testItem1', 'testItem2', 'testItem3'];
    //model = new Instructor('Spencer', 'Hilton', 12, 'Sample notes!');
    model: Instructor;

    constructor(
        private instructorService: InstructorService,
        private location: Location) {
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        this.instructorService.postInstructorForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
    }

    testFunction(param: string) {
        return 'testFunction worked';
    }

    goBack(): void {
        this.location.back();
    }
}