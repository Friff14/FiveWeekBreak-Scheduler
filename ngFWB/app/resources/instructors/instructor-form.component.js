"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var instructor_model_1 = require('./instructor.model');
var InstructorFormComponent = (function () {
    function InstructorFormComponent(instructorService, location, _route) {
        this.instructorService = instructorService;
        this.location = location;
        this._route = _route;
        this.pageTitle = 'Add Instructor';
        this.testItems = ['testItem1', 'testItem2', 'testItem3'];
        this.model = new instructor_model_1.Instructor('Spencer', 'Hilton', 12, 'Sample notes!');
    }
    // submitForm(form: NgForm) {
    //     console.log(this.model);
    //     this.instructorService.postInstructorForm(this.model)
    //         .subscribe(
    //             data => console.log('success: ', data),
    //             err => console.log('error: ', err)
    //         )
    // }
    InstructorFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        if (this.id) {
            this.instructorService.putInstructorForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
        this.instructorService.postInstructorForm(this.model)
            .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
    };
    InstructorFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = "Edit Instructor: " + this.id;
            console.log(this.instructorService.getInstructor(this.id));
            this.instructorService.getInstructor(this.id)
                .subscribe(function (instructor) { return _this.model = instructor; }, function (error) { return console.log('get error: ', error); });
        }
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
        })
    ], InstructorFormComponent);
    return InstructorFormComponent;
}());
exports.InstructorFormComponent = InstructorFormComponent;
//# sourceMappingURL=instructor-form.component.js.map