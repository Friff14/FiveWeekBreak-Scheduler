import { Component, OnInit } from '@angular/core';

import { IInstructor } from './instructor';
import { Instructor } from './instructor.model';
import { InstructorService } from './instructor.service';

@Component({
    moduleId: module.id,
    templateUrl: 'instructor-list.component.html'
})
export class InstructorListComponent implements OnInit {
    instructors: IInstructor[];
    pageTitle: string = 'Instructor List';
    //instructors: Instructor[];

    constructor(
        private _instructorService: InstructorService
        //private instructors: IInstructor[]
    ){}

    getInstructors() {
        this._instructorService.getInstructors()
            .subscribe(
                instructors => this.instructors = instructors,
                error => console.log('get error: ', error));
        console.log(this.instructors);
    }

    ngOnInit(): void {
        this.getInstructors();
    }
}