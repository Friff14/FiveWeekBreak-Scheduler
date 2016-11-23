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
// Angular imports
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
// The imports from the modules we have made.
var app_component_1 = require('./app.component');
// Until modules connections are taken care of, use components for now.
var home_component_1 = require('./home/home.component');
var course_list_component_1 = require('./courses/course-list.component');
var room_form_component_1 = require('./rooms/room-form.component');
var room_list_component_1 = require('./rooms/room-list.component');
var instructor_list_component_1 = require('./instructors/instructor-list.component');
var course_form_component_1 = require('./courses/course-form.component');
var section_form_component_1 = require('./sections/section-form.component');
var course_service_1 = require('./courses/course.service');
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
                    { path: 'courseForm', component: course_form_component_1.CourseFormComponent },
                    { path: 'courseList', component: course_list_component_1.CourseListComponent },
                    { path: 'instructorList', component: instructor_list_component_1.InstructorListComponent },
                    { path: 'roomList', component: room_list_component_1.RoomListComponent },
                    { path: 'sectionForm', component: section_form_component_1.SectionFormComponent },
                    { path: 'addCourse', component: course_form_component_1.CourseFormComponent },
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: '**', redirectTo: 'home', pathMatch: 'full' }
                ]),
            ],
            declarations: [app_component_1.AppComponent,
                home_component_1.HomeComponent,
                course_list_component_1.CourseListComponent,
                instructor_list_component_1.InstructorListComponent,
                course_form_component_1.CourseFormComponent,
                section_form_component_1.SectionFormComponent,
                room_form_component_1.RoomFormComponent,
                room_list_component_1.RoomListComponent
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