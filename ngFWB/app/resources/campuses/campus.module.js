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
 * Created by adsal on 11/26/2016.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var campus_form_component_1 = require('./campus-form.component');
var campus_list_component_1 = require('./campus-list.component');
var campus_service_1 = require('./campus.service');
var CampusModule = (function () {
    function CampusModule() {
    }
    CampusModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild([
                    { path: 'campusForm', component: campus_form_component_1.CampusFormComponent },
                    { path: 'campusList', component: campus_list_component_1.CampusListComponent }
                ])
            ],
            declarations: [
                campus_form_component_1.CampusFormComponent,
                campus_list_component_1.CampusListComponent
            ],
            exports: [
                campus_form_component_1.CampusFormComponent,
                campus_list_component_1.CampusListComponent
            ],
            providers: [
                campus_service_1.CampusService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CampusModule);
    return CampusModule;
}());
exports.CampusModule = CampusModule;
//# sourceMappingURL=campus.module.js.map