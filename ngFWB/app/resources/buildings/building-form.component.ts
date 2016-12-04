/**
 * Created by doebo on 11/28/2016.
 */
import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Building } from './building.model'
import {BuildingService} from "./building.service";

@Component({
    selector: 'building-form',
    moduleId: module.id,
    templateUrl: 'building-form.component.html'
})
export class BuildingFormComponent {
    pageTitle: string = 'Add Building';
    model = new Building('Building 3', 'D3', 1);

    constructor(
        private buildingService: BuildingService,
        private location: Location) {
    }

    submitForm(form: NgForm) {
        console.log(this.model);
        this.buildingService.postBuildingForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
    }

    goBack(): void {
        this.location.back();
    }
}