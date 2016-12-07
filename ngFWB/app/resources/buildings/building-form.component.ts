/**
 * Created by doebo on 11/28/2016.
 */
import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Building } from './building.model'
import {BuildingService} from "./building.service";
import {ActivatedRoute} from '@angular/router';
import {IBuilding} from "./building";

@Component({
    selector: 'building-form',
    moduleId: module.id,
    templateUrl: 'building-form.component.html'
})
export class BuildingFormComponent implements OnInit {
    pageTitle: string = 'Add Building';
    model = new Building('Building 3', 'D3', 1);
    buildings: IBuilding[];
    building: IBuilding;
    id: number;

    constructor(
        private buildingService: BuildingService,
        private location: Location,
        private _route: ActivatedRoute){
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        if(this.id) {
            this.buildingService.putBuildingForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log('error: ', err)
                )
        }
        else {
            this.buildingService.postBuildingForm(this.model)
                .subscribe(
                    data => console.log('success: ', data),
                    err => console.log('error: ', err)
                )
        }
    }

    ngOnInit(): void {
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = `Edit Building: ${this.id}`;

            console.log(this.buildingService.getBuilding(this.id));
            this.buildingService.getBuilding(this.id)
                .subscribe(building => this.model = building,
                    error => console.log('get error: ', error));
        }
    }

    goBack(): void {
        this.location.back();
    }
}