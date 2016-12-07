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
var section_model_1 = require('./section.model');
var section_service_1 = require("./section.service");
var router_1 = require('@angular/router');
var section_time_model_1 = require("./section-time.model");
var SectionFormComponent = (function () {
    function SectionFormComponent(sectionService, location, _route) {
        this.sectionService = sectionService;
        this.location = location;
        this._route = _route;
        this.pageTitle = 'Section Form';
        this.model = new section_model_1.Section(null, ' ', null, null, null, null, null, null, null);
        this.sectiontime = new section_time_model_1.SectionTime(null, null, null);
        this.days = [false, false, false, false, false, false];
        this.day_strings = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    }
    //TODO: EDIT SECTION POPULATE FORM
    SectionFormComponent.prototype.submitForm = function (form) {
        this.model.schedule_times = [];
        console.log(this.model.schedule_times);
        for (var i = 0; i < this.days.length; i++) {
            if (this.days[i]) {
                this.model.schedule_times.push(new section_time_model_1.SectionTime(this.starttime, this.endtime, this.day_strings[i]));
            }
        }
        console.log(this.model);
        this.sectionService.postSectionForm(this.model)
            .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
    };
    SectionFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sectionService.getCourses()
            .subscribe(function (courses) { return _this.courses = courses; }, function (error) { return console.log('get error: ', error); });
        this.sectionService.getInstructors()
            .subscribe(function (instructors) { return _this.instructors = instructors; }, function (error) { return console.log('get error: ', error); });
        this.sectionService.getSemesters()
            .subscribe(function (semesters) { return _this.semesters = semesters; }, function (error) { return console.log('get error: ', error); });
        this.sectionService.getRooms()
            .subscribe(function (rooms) { return _this.rooms = rooms; }, function (error) { return console.log('get error: ', error); });
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = "Edit Section: " + this.id;
            this.sectionService.getSection(this.id)
                .subscribe(function (prefix) { return _this.model = prefix; }, function (error) { return console.log('get error: ', error); });
        }
    };
    SectionFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    SectionFormComponent = __decorate([
        core_1.Component({
            selector: 'section-form',
            moduleId: module.id,
            templateUrl: 'section-form.component.html'
        }), 
        __metadata('design:paramtypes', [section_service_1.SectionService, common_1.Location, router_1.ActivatedRoute])
    ], SectionFormComponent);
    return SectionFormComponent;
}());
exports.SectionFormComponent = SectionFormComponent;
//# sourceMappingURL=section-form.component.js.map