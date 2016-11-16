import { Component, OnInit } from '@angular/core';
import { ICourse } from './course';
import { CourseService } from './course.service';

@Component({
    selector: 'pm-courses',
    moduleId: module.id,
    templateUrl: 'course-list.component.html'
})

export class CourseListComponent implements OnInit{
    pageTitle: string = 'Course List';
    errorMessage: string;
    courses: ICourse[];

    
    constructor(private _courseService: CourseService) {}

    ngOnInit(): void {
        console.log("Hiii")
        this._courseService.getCourses()
                .subscribe(courses => this.courses = courses,
                           error => this.errorMessage = <any>error);

        
    }
}
