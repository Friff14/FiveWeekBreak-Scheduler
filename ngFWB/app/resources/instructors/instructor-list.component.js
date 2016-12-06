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
var instructor_service_1 = require('./instructor.service');
var instructor_service2_1 = require('./instructor.service2');
var InstructorListComponent = (function () {
    //instructors: Instructor[];
    function InstructorListComponent(_instructorService, _instructorService2) {
        this._instructorService = _instructorService;
        this._instructorService2 = _instructorService2;
        this.pageTitle = 'Instructor List';
    }
    InstructorListComponent.prototype.getInstructors = function () {
        var _this = this;
        this._instructorService.getInstructors()
            .subscribe(function (instructors) { return _this.instructors = instructors; }, function (error) { return console.log('get error: ', error); });
        console.log(this.instructors);
    };
    // getInstructors() {
    //     this._instructorService2.getInstructors()
    //         .subscribe(
    //             instructors => this.instructors = instructors,
    //             error => console.log('get error: ', error)
    //         );
    // }
    InstructorListComponent.prototype.ngOnInit = function () {
        this.getInstructors();
    };
    InstructorListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'instructor-list.component.html'
        }), 
        __metadata('design:paramtypes', [instructor_service_1.InstructorService, instructor_service2_1.InstructorService2])
    ], InstructorListComponent);
    return InstructorListComponent;
}());
exports.InstructorListComponent = InstructorListComponent;
//# sourceMappingURL=instructor-list.component.js.map