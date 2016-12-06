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
var instructor_model_1 = require('./instructor.model');
var instructor_service_1 = require("./instructor.service");
var InstructorFormComponent = (function () {
    //model: Instructor;
    function InstructorFormComponent(instructorService, 
        //private model: Instructor,
        //private model: IInstructor,
        location) {
        this.instructorService = instructorService;
        this.location = location;
        this.pageTitle = 'Add Instructor';
        this.testItems = ['testItem1', 'testItem2', 'testItem3'];
        this.model = new instructor_model_1.Instructor('Spencer', 'Hilton', 12, 'Sample notes!');
    }
    InstructorFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        this.instructorService.postInstructorForm(this.model)
            .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
    };
    InstructorFormComponent.prototype.testFunction = function (param) {
        return 'testFunction worked';
    };
    InstructorFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    InstructorFormComponent = __decorate([
        core_1.Component({
            selector: 'instructor-form',
            moduleId: module.id,
            templateUrl: 'instructor-form.component.html'
        }), 
        __metadata('design:paramtypes', [instructor_service_1.InstructorService, common_1.Location])
    ], InstructorFormComponent);
    return InstructorFormComponent;
}());
exports.InstructorFormComponent = InstructorFormComponent;
//# sourceMappingURL=instructor-form.component.js.map