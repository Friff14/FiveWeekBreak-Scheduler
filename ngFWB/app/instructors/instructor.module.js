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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var instructor_list_component_1 = require('./instructor-list.component');
var instructor_form_component_1 = require('./instructor-form.component');
var instructor_service_1 = require('./instructor.service');
var InstructorModule = (function () {
    function InstructorModule() {
    }
    InstructorModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: 'instructorList', component: instructor_list_component_1.InstructorListComponent },
                    { path: 'instructorForm', component: instructor_form_component_1.InstructorFormComponent },
                ])
            ],
            declarations: [
                instructor_list_component_1.InstructorListComponent,
                instructor_form_component_1.InstructorFormComponent
            ],
            exports: [
                instructor_list_component_1.InstructorListComponent,
                instructor_form_component_1.InstructorFormComponent
            ],
            providers: [
                instructor_service_1.InstructorService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], InstructorModule);
    return InstructorModule;
}());
exports.InstructorModule = InstructorModule;
//# sourceMappingURL=instructor.module.js.map