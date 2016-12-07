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
var common_1 = require('@angular/common');
var semester_model_1 = require('./semester.model');
var semester_service_1 = require('./semester.service');
var router_1 = require('@angular/router');
var SemesterFormComponent = (function () {
    function SemesterFormComponent(semesterService, location, _route) {
        this.semesterService = semesterService;
        this.location = location;
        this._route = _route;
        this.pageTitle = 'Semester Form';
        this.model = new semester_model_1.Semester('~~~');
    }
    SemesterFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        if (this.id) {
            this.semesterService.putSemesterForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
        else {
            this.semesterService.postSemesterForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
    };
    SemesterFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = "Edit Semester: " + this.id;
            console.log(this.semesterService.getSemester(this.id));
            this.semesterService.getSemester(this.id)
                .subscribe(function (prefix) { return _this.model = prefix; }, function (error) { return console.log('get error: ', error); });
        }
    };
    SemesterFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    SemesterFormComponent = __decorate([
        core_1.Component({
            selector: 'semester-form',
            moduleId: module.id,
            templateUrl: 'semester-form.component.html'
        }), 
        __metadata('design:paramtypes', [semester_service_1.SemesterService, common_1.Location, router_1.ActivatedRoute])
    ], SemesterFormComponent);
    return SemesterFormComponent;
}());
exports.SemesterFormComponent = SemesterFormComponent;
//# sourceMappingURL=semester-form.component.js.map