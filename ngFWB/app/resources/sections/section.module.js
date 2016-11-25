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
var section_list_component_1 = require('./section-list.component');
var section_form_component_1 = require('./section-form.component');
var section_service_1 = require('./section.service');
var SectionModule = (function () {
    function SectionModule() {
    }
    SectionModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: 'courseList', component: section_list_component_1.SectionListComponent },
                    // { path: 'product/:id',
                    //  canActivate: [ ProductDetailGuard],
                    // component: ProductDetailComponent
                    //}
                    { path: 'sectionForm', component: section_form_component_1.SectionFormComponent },
                    { path: 'editCourse', component: section_form_component_1.SectionFormComponent },
                    { path: 'removeCourse', component: section_list_component_1.SectionListComponent }
                ])
            ],
            declarations: [
                section_list_component_1.SectionListComponent,
                section_form_component_1.SectionFormComponent
            ],
            exports: [
                section_list_component_1.SectionListComponent,
                section_form_component_1.SectionFormComponent
            ],
            providers: [
                section_service_1.SectionService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SectionModule);
    return SectionModule;
}());
exports.SectionModule = SectionModule;
//# sourceMappingURL=section.module.js.map