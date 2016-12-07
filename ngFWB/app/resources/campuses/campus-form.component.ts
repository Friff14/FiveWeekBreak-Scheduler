/**
 * Created by adsal on 11/26/2016.
 */
import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Campus } from './campus.model'
import {CampusService} from "./campus.service";
import {ActivatedRoute} from '@angular/router';
import {ICampus} from "./campus";

@Component({
    selector: 'campus-form',
    moduleId: module.id,
    templateUrl: 'campus-form.component.html'
})
export class CampusFormComponent implements OnInit{
    pageTitle: string = 'Add Campus';
    model = new Campus('Ogden');
    campuses: ICampus[];
    campus: ICampus;
    id: number;

    constructor(
        private campusService: CampusService,
        private location: Location,
        private _route: ActivatedRoute) {
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        if(this.id) {
            this.campusService.putCampusForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log ('error: ', err)
                )
        }
        else {
            this.campusService.postCampusForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log('error: ', err)
                )
        }
    }
    
    ngOnInit(): void {
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = `Edit Campus: ${this.id}`;

            console.log(this.campusService.getCampus(this.id));
            this.campusService.getCampus(this.id)
                .subscribe(campus => this.model = campus,
                    error => console.log('get error: ', error));
        }
    }
    
    goBack(): void {
        this.location.back();
    }

}