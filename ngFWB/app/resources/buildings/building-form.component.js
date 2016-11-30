"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by doebo on 11/28/2016.
 */
var core_1 = require('@angular/core');
var building_model_1 = require('./building.model');
var building_service_1 = require("./building.service");
var BuildingFormComponent = (function () {
    function BuildingFormComponent(buildingService) {
        this.buildingService = buildingService;
        this.pageTitle = 'Add Building';
        this.model = new building_model_1.Building('Building 3', 'D3', 1);
    }
    BuildingFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        this.buildingService.postBuildingForm(this.model)
            .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
    };
    BuildingFormComponent = __decorate([
        core_1.Component({
            selector: 'building-form',
            moduleId: module.id,
            templateUrl: 'building-form.component.html'
        }), 
        __metadata('design:paramtypes', [building_service_1.BuildingService])
    ], BuildingFormComponent);
    return BuildingFormComponent;
}());
exports.BuildingFormComponent = BuildingFormComponent;
//# sourceMappingURL=building-form.component.js.map