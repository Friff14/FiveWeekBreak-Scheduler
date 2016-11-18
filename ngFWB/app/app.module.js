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
// The imports we need for this module.
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
// The imports from the components we have made.
var app_component_1 = require('./app.component');
//import { ResourceModule } from './resources/resource.module';
//import { CourseModule } from './courses/course.module';
var home_component_1 = require('./home/home.component');
var course_list_component_1 = require('./courses/course-list.component');
var instructor_list_component_1 = require('./instructors/instructor-list.component');
var course_form_component_1 = require('./forms/course-form.component');
var calendar_component_1 = require('./calendar/calendar.component');
var course_service_1 = require('./courses/course.service');
//import { CourseFormComponent } from './courses/course-form.component';
// The NgModule decorator for metadata.
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
                    { path: 'home', component: home_component_1.HomeComponent },
                    { path: 'courses', component: course_form_component_1.CourseFormComponent },
                    { path: 'courseList', component: course_list_component_1.CourseListComponent },
                    { path: 'calendar', component: calendar_component_1.CalendarComponent },
                    { path: 'add', component: course_form_component_1.CourseFormComponent },
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: '**', redirectTo: 'home', pathMatch: 'full' }
                ]),
            ],
            declarations: [app_component_1.AppComponent,
                home_component_1.HomeComponent,
                course_list_component_1.CourseListComponent,
                instructor_list_component_1.InstructorListComponent,
                course_form_component_1.CourseFormComponent,
                calendar_component_1.CalendarComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [course_service_1.CourseService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map