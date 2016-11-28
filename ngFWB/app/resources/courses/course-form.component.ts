import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Course } from './course.model'
import {CourseService} from "./course.service";

@Component({
    selector: 'course-form',
    moduleId: module.id,
    templateUrl: 'course-form.component.html'
})
export class CourseFormComponent {
    pageTitle: string = 'Add Course';
    //testItems = ['testItem1', 'testItem2', 'testItem3'];
    //model = new Course('Spencer Hilton', 12, 'Sample notes!');

    //constructor(private courseService: CourseService) {
    //}

    //submitForm(form: NgForm) {
    //    console.log(this.model);
    //    this.courseService.postCourseForm(this.model)
    //        .subscribe(
    //            data => console.log('success: ', data),
    //            err => console.log('error: ', err)
    //        )
    //}

    //testFunction(param: string) {
    //    return 'testFunction worked';
    //}

}