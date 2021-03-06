import { Component, OnInit, NgZone } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import { IInstructor } from './instructor';
import { Instructor } from './instructor.model'
import {InstructorService} from "./instructor.service";

@Component({
    selector: 'instructor-form',
    moduleId: module.id,
    templateUrl: 'instructor-form.component.html'
})
export class InstructorFormComponent implements OnInit {
    pageTitle: string = 'Add Instructor';
    testItems = ['testItem1', 'testItem2', 'testItem3'];
    model = new Instructor('', '', 0, '');
    instructors: IInstructor[];
    id: number;

    constructor(
        private instructorService: InstructorService,
        private location: Location,
        private _route: ActivatedRoute,
        private _router: Router,
        private zone: NgZone) {
            
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        if(this.id) {
            this.instructorService.putInstructorForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log ('error: ', err)
                )
        }
        else {
        this.instructorService.postInstructorForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
         }
    }

    ngOnInit() {
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = `Edit Instructor: ${this.id}`;

            console.log(this.instructorService.getInstructor(this.id));
            this.instructorService.getInstructor(this.id)
                .subscribe(instructor => this.model = instructor,
                    error => console.log('get error: ', error));
        }
    }

    testFunction(param: string) {
        return 'testFunction worked';
    }

    goBack(): void {
        this.location.back();
        //window.location.reload();
        //this._router.navigate(['/instructorList']);
    }

    processAndGoBack(): void {
        this.zone.runOutsideAngular(() => this.goBack());
    }
}