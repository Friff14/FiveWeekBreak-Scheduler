import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Section } from './section.model'
import {SectionService} from "./section.service";

@Component({
    selector: 'section-form',
    moduleId: module.id,
    templateUrl: 'section-form.component.html'
})
export class SectionFormComponent {
    pageTitle: string = 'Add Section';
    /*
    testItems = ['testItem1', 'testItem2', 'testItem3'];
    model = new Section('Spencer', 'Hilton', 12, 'Sample notes!');

    constructor(private sectionService: SectionService) {
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        this.sectionService.postSectionForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
    }

    testFunction(param: string) {
        return 'testFunction worked';
    }
    */
}