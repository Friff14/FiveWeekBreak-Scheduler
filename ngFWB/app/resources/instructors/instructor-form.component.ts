import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'instructor-form.component.html'
})
export class InstructorFormComponent {
    pageTitle: string = 'Add Instructor';
    testItems = ['testItem1', 'testItem2', 'testItem3']
}