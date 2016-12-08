import { Component, OnInit, NgZone } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';

import { Course } from './course.model'
import { CourseService } from "./course.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from "./course";
import { IPrefix } from "../prefixes/prefix";
import { Prefix } from "../prefixes/prefix.model";

@Component({
    selector: 'course-form',
    moduleId: module.id,
    templateUrl: 'course-form.component.html'
})
export class CourseFormComponent implements OnInit {
    pageTitle: string = 'Add Course';
    model = new Course(null, '', '', '', null, null);
    prefix: IPrefix;
    prefixes: IPrefix[];
    id: number;

    constructor(
        private courseService: CourseService,
        private location: Location,
        private _route: ActivatedRoute,
        private _router: Router,
        private zone: NgZone) {
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        if(this.id) {
            this.courseService.putCourseForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log ('error: ', err)
                )
        }
        else {
            this.courseService.postCourseForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log('error: ', err)
                )
        }
    }

    ngOnInit(): void {
        // this.courseService.getCampuses()
        //     .subscribe(campuses => this.campuses = campuses,
        //         error => console.log('get error: ', error));

        this.courseService.getPrefixes()
                .subscribe(prefixes => this.prefixes = prefixes,
                    error => console.log('get error: ', error));

        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = `Edit Prefix: ${this.id}`;

        this.courseService.getCourse(this.id)
            .subscribe(course => this.model = course,
            error => console.log('get error: ', error));
        }
    }

    goBack(): void {
        //this._router.navigate(['/courseList']);
        this.location.back();
    }

    processAndGoBack(): void {
        this.zone.runOutsideAngular(() => this.goBack());
    }
}