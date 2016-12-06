import { Component, OnInit } from '@angular/core';

import { IInstructor } from './instructor';
import { Instructor } from './instructor.model';
import { InstructorService } from './instructor.service';
import { InstructorService2 } from './instructor.service2';

@Component({
    moduleId: module.id,
    templateUrl: 'instructor-list.component.html'
})
export class InstructorListComponent implements OnInit {
    instructors: IInstructor[];
    pageTitle: string = 'Instructor List';
    //instructors: Instructor[];

    constructor(
        private _instructorService: InstructorService,
        private _instructorService2: InstructorService2
    ){}

    getInstructors() {
        this._instructorService.getInstructors()
            .subscribe(
                instructors => this.instructors = instructors,
                error => console.log('get error: ', error));
        console.log(this.instructors);
    }

    // getInstructors() {
    //     this._instructorService2.getInstructors()
    //         .subscribe(
    //             instructors => this.instructors = instructors,
    //             error => console.log('get error: ', error)
    //         );
    // }

    ngOnInit(): void {
        this.getInstructors();
    }
}