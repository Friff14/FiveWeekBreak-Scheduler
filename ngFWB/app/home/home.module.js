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
var home_view_component_1 = require('./home-view.component');
var instr_view_component_1 = require('./instr-view.component');
var room_view_component_1 = require('./room-view.component');
var course_view_component_1 = require('./course-view.component');
var home_service_1 = require('./home.service');
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: 'homeView', component: home_view_component_1.HomeViewComponent },
                    { path: 'instrView', component: instr_view_component_1.InstrViewComponent },
                    { path: 'roomView', component: room_view_component_1.RoomViewComponent },
                    { path: 'courseView', component: room_view_component_1.RoomViewComponent }
                ])
            ],
            declarations: [
                home_view_component_1.HomeViewComponent,
                instr_view_component_1.InstrViewComponent,
                room_view_component_1.RoomViewComponent,
                course_view_component_1.CourseViewComponent
            ],
            exports: [
                home_view_component_1.HomeViewComponent,
                instr_view_component_1.InstrViewComponent,
                room_view_component_1.RoomViewComponent,
                course_view_component_1.CourseViewComponent
            ],
            providers: [
                home_service_1.HomeService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map