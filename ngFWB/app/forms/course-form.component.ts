
import { Component } from '@angular/core';

import { IPrefix } from '../prefix/prefix';

@Component({
    moduleId: module.id,
    templateUrl: 'course-form.component.html'
})
export class CourseFormComponent {
    prefixes: IPrefix[];
}