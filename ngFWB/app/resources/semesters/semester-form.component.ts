/**
 * Created by Tanner_2 on 11/27/2016.
 */
import {Component, OnInit, NgZone} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Semester } from './semester.model';
import { SemesterService } from './semester.service';
import {ActivatedRoute} from '@angular/router';
import {ISemester} from "./semester";

@Component({
    selector: 'semester-form',
    moduleId: module.id,
    templateUrl: 'semester-form.component.html'
})
export class SemesterFormComponent implements OnInit{
    pageTitle: string = 'Semester Form';
    model = new Semester('~~~', null, null);
    prefixes: ISemester[];
    prefix: ISemester;
    id: number;


    constructor(
        private semesterService: SemesterService,
        private location: Location,
        private _route: ActivatedRoute,
        private zone: NgZone
    ){}

    submitForm(form: NgForm) {
        console.log(this.model);
        if(this.id) {
            this.semesterService.putSemesterForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log ('error: ', err)
                )
        }
        else {
            this.semesterService.postSemesterForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log('error: ', err)
                )
        }
    }

    ngOnInit(): void {
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = `Edit Semester: ${this.id}`;

            console.log(this.semesterService.getSemester(this.id));
            this.semesterService.getSemester(this.id)
                .subscribe(prefix => this.model = prefix,
                    error => console.log('get error: ', error));
        }
    }

    goBack(): void {
        this.location.back();
    }

    processAndGoBack(): void {
        this.zone.runOutsideAngular(() => this.goBack());
    }
}