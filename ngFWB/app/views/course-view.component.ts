import { Component } from '@angular/core';

@Component({
    selector: 'course-view-app',
    moduleId: module.id,
    templateUrl: 'course-view.component.html'
})
export class CourseViewComponent {
    pageTitle: string = 'Current Schedule';
}