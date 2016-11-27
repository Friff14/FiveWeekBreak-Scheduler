/**
 * Created by adsal on 11/26/2016.
 */
import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Campus } from './campus.model'
import {CampusService} from "./campus.service";

@Component({
    selector: 'campus-form',
    moduleId: module.id,
    templateUrl: 'campus-form.component.html'
})
export class CampusFormComponent {
    pageTitle: string = 'Add Campus';
    model = new Campus('Ogden', '123 Main St.');

    constructor(private campusService: CampusService) {
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        this.campusService.postCampusForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
    }

}