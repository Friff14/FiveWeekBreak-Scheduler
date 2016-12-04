/**
 * Created by bpalm_000 on 11/28/2016.
 */
import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Prefix } from './prefix.model'
import {PrefixService} from "./prefix.service";

@Component({
    selector: 'prefix-form',
    moduleId: module.id,
    templateUrl: 'prefix-form.component.html'
})
export class PrefixFormComponent {
    pageTitle: string = 'Add Prefix';
    model = new Prefix('CS');

    constructor(
        private prefixService: PrefixService,
        private location: Location) {
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        this.prefixService.postPrefixForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
    }

    goBack(): void {
        this.location.back();
    }

}