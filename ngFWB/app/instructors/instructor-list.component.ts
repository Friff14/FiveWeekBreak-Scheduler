import { Component } from '@angular/core';

import { IInstructor } from './instructor';

@Component({
    templateUrl: './instructor-list.component.html'
})
export class InstructorListComponent {
    instructors: IInstructor[];
}