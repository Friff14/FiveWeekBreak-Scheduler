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
var course_model_1 = require('./course.model');
var course_service_1 = require("./course.service");
var CourseFormComponent = (function () {
    function CourseFormComponent(courseService) {
        this.courseService = courseService;
        this.pageTitle = 'Add Course';
        this.testItems = ['testItem1', 'testItem2', 'testItem3'];
        this.model = new course_model_1.Course('9999', 'It\'s a course!', 4, this.prefix);
    }
    CourseFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        this.courseService.postCourseForm(this.model)
            .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
    };
    CourseFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.courseService.getPrefixes()
            .subscribe(function (prefixes) { return _this.prefixes = prefixes; }, function (error) { return console.log('get error: ', error); });
        //console.log("HI2");
    };
    CourseFormComponent.prototype.testFunction = function (param) {
        return 'testFunction worked';
    };
    CourseFormComponent = __decorate([
        core_1.Component({
            selector: 'course-form',
            moduleId: module.id,
            templateUrl: 'course-form.component.html'
        }), 
        __metadata('design:paramtypes', [course_service_1.CourseService])
    ], CourseFormComponent);
    return CourseFormComponent;
}());
exports.CourseFormComponent = CourseFormComponent;
//# sourceMappingURL=course-form.component.js.map