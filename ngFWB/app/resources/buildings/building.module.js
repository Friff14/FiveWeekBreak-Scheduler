"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by doebo on 11/27/2016.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var building_form_component_1 = require('./building-form.component');
var building_list_component_1 = require('./building-list.component');
var building_service_1 = require('./building.service');
var BuildingModule = (function () {
    function BuildingModule() {
    }
    BuildingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild([
                    { path: 'buildingForm', component: building_form_component_1.BuildingFormComponent },
                    { path: 'buildingList', component: building_list_component_1.BuildingListComponent }
                ])
            ],
            declarations: [
                building_form_component_1.BuildingFormComponent,
                building_list_component_1.BuildingListComponent
            ],
            exports: [
                building_form_component_1.BuildingFormComponent,
                building_list_component_1.BuildingListComponent
            ],
            providers: [
                building_service_1.BuildingService
            ]
        })
    ], BuildingModule);
    return BuildingModule;
}());
exports.BuildingModule = BuildingModule;
//# sourceMappingURL=building.module.js.map