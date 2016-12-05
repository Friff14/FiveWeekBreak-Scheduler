import { Component, OnInit } from '@angular/core';

import { ICourse } from './course';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Component({
    // selector: pm-courses,
    moduleId: module.id,
    templateUrl: 'course-list.component.html'
})

export class CourseListComponent implements OnInit{

    // The name of this list as it will be displayed in the templateUrl
    // 
    pageTitle: string = 'Course List';

    // Part of the exception handling.
    errorMessage: string;

    // The actual list of courses to use in the app.
    // Will interact with the database.
    courses: ICourse[];
    
    constructor(private _courseService: CourseService) {}

    // Subscribes to the service from above.
    ngOnInit(): void {
        console.log("Hiii")
        this._courseService.getCourses()
                .subscribe(courses => this.courses = courses,
                           error => this.errorMessage = <any>error);

        
    }
}
