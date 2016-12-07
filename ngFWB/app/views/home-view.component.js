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
var home_service_1 = require("./home.service");
var semester_model_1 = require("../resources/semesters/semester.model");
var router_1 = require("@angular/router");
var HomeViewComponent = (function () {
    function HomeViewComponent(homeService, router) {
        this.homeService = homeService;
        this.router = router;
        this.pageTitle = 'Current Schedule';
        this.model = new semester_model_1.Semester(null, null, null);
        this.download_url = "http://localhost:8000/xlsx/1/output.xlsx";
    }
    HomeViewComponent.prototype.change_download_url = function (event) {
        this.download_url = "http://localhost:8000/xlsx/" + String(event) + '/output.xlsx';
    };
    HomeViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.homeService);
        this.homeService.getSemesters()
            .subscribe(function (semesters) { return _this.semesters = semesters; }, function (error) { return console.log('get error: ', error); });
    };
    HomeViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home-view.component.html',
            styleUrls: ['home-view.component.css']
        }), 
        __metadata('design:paramtypes', [home_service_1.HomeService, router_1.Router])
    ], HomeViewComponent);
    return HomeViewComponent;
}());
exports.HomeViewComponent = HomeViewComponent;
//# sourceMappingURL=home-view.component.js.map