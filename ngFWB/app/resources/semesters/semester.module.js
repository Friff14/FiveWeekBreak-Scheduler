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
 * Created by Tanner_2 on 11/27/2016.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var semester_list_component_1 = require('./semester-list.component');
var semester_form_component_1 = require('./semester-form.component');
var semester_service_1 = require('./semester.service');
var SemesterModule = (function () {
    function SemesterModule() {
    }
    SemesterModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild([
                    //{ path: 'semesterList', component: SemesterListComponent },
                    { path: 'semesterForm', component: semester_form_component_1.SemesterFormComponent },
                    { path: 'editSemester', component: semester_form_component_1.SemesterFormComponent },
                    { path: 'remove', component: semester_form_component_1.SemesterFormComponent }
                ])
            ],
            declarations: [
                semester_list_component_1.SemesterListComponent,
                semester_form_component_1.SemesterFormComponent
            ],
            exports: [
                semester_form_component_1.SemesterFormComponent
            ],
            providers: [
                semester_service_1.SemesterService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SemesterModule);
    return SemesterModule;
}());
exports.SemesterModule = SemesterModule;
//# sourceMappingURL=semester.module.js.map