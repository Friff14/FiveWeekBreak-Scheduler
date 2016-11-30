import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Course } from './course.model'
import {CourseService} from "./course.service";
import {IPrefix} from "../prefixes/prefix";

@Component({
    selector: 'course-form',
    moduleId: module.id,
    templateUrl: 'course-form.component.html'
})
export class CourseFormComponent {
    pageTitle: string = 'Add Course';
    testItems = ['testItem1', 'testItem2', 'testItem3'];
    prefix: IPrefix;
    model = new Course('9999', 'It\'s a course!', 4, this.prefix);

    prefixes: IPrefix[];


    constructor(private courseService: CourseService) {
    }

    submitForm(form: NgForm) {
       console.log(this.model);
       this.courseService.postCourseForm(this.model)
           .subscribe(
               data => console.log('success: ', data),
               err => console.log('error: ', err)
           )
    }

    ngOnInit(): void {
        this.courseService.getPrefixes()
            .subscribe(prefixes => this.prefixes = prefixes,
                error => console.log('get error: ', error));
        console.log("HI");
    }

    testFunction(param: string) {
       return 'testFunction worked';
    }

}