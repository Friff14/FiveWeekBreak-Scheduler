/**
 * Created by bpalm_000 on 11/28/2016.
 */
import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Prefix } from './prefix.model'
import {PrefixService} from "./prefix.service";
import {ActivatedRoute} from '@angular/router';
import {IPrefix} from "./prefix";

@Component({
    selector: 'prefix-form',
    moduleId: module.id,
    templateUrl: 'prefix-form.component.html'
})
export class PrefixFormComponent implements OnInit{
    pageTitle: string = 'Add Prefix';
    model = new Prefix('~~~');
    //model: Prefix;\
    prefixes: IPrefix[];
    prefix: IPrefix;
    id: number;


    constructor(
        private prefixService: PrefixService,
        private location: Location,
        private _route: ActivatedRoute) {
        }
//TODO: DO A PUT IF THE ID IS NOT THERE.
    submitForm(form: NgForm) {
        console.log(this.model);
        if(this.id) {
            this.prefixService.putPrefixForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log ('error: ', err)
                )
        }

        this.prefixService.postPrefixForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
    }


    ngOnInit(): void {
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = `Edit Prefix: ${this.id}`;

            console.log(this.prefixService.getPrefix(this.id));
            this.prefixService.getPrefix(this.id)
                .subscribe(prefix => this.model = prefix,
                    error => console.log('get error: ', error));
        }
    }

    goBack(): void {
        this.location.back();
    }

}