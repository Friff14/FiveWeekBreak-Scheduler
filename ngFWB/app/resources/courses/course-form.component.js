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
var common_1 = require('@angular/common');
var course_model_1 = require('./course.model');
var course_service_1 = require("./course.service");
var router_1 = require('@angular/router');
var CourseFormComponent = (function () {
    function CourseFormComponent(courseService, location, _route) {
        this.courseService = courseService;
        this.location = location;
        this._route = _route;
        this.pageTitle = 'Add Course';
        this.model = new course_model_1.Course(null, '', '', '', null, null);
    }
    CourseFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        if (this.id) {
            this.courseService.putCourseForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
        else {
            this.courseService.postCourseForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
    };
    CourseFormComponent.prototype.ngOnInit = function () {
        // this.courseService.getCampuses()
        //     .subscribe(campuses => this.campuses = campuses,
        //         error => console.log('get error: ', error));
        var _this = this;
        this.courseService.getPrefixes()
            .subscribe(function (prefixes) { return _this.prefixes = prefixes; }, function (error) { return console.log('get error: ', error); });
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = "Edit Prefix: " + this.id;
        }
    };
    CourseFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    CourseFormComponent = __decorate([
        core_1.Component({
            selector: 'course-form',
            moduleId: module.id,
            templateUrl: 'course-form.component.html'
        }), 
        __metadata('design:paramtypes', [course_service_1.CourseService, common_1.Location, router_1.ActivatedRoute])
    ], CourseFormComponent);
    return CourseFormComponent;
}());
exports.CourseFormComponent = CourseFormComponent;
//# sourceMappingURL=course-form.component.js.map