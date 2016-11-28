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
var course_list_component_1 = require('./course-list.component');
var course_form_component_1 = require('./course-form.component');
var course_service_1 = require('./course.service');
var CourseModule = (function () {
    function CourseModule() {
    }
    CourseModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: 'courseList', component: course_list_component_1.CourseListComponent },
                    // { path: 'product/:id',
                    //  canActivate: [ ProductDetailGuard],
                    // component: ProductDetailComponent
                    //}
                    { path: 'courseForm', component: course_form_component_1.CourseFormComponent },
                    { path: 'editCourse', component: course_form_component_1.CourseFormComponent },
                    { path: 'removeCourse', component: course_list_component_1.CourseListComponent }
                ])
            ],
            declarations: [
                course_list_component_1.CourseListComponent,
                course_form_component_1.CourseFormComponent
            ],
            exports: [
                course_list_component_1.CourseListComponent,
                course_form_component_1.CourseFormComponent
            ],
            providers: [
                course_service_1.CourseService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CourseModule);
    return CourseModule;
}());
exports.CourseModule = CourseModule;
//# sourceMappingURL=course.module.js.map