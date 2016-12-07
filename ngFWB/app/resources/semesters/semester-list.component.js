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
 * Created by Tanner_2 on 11/28/2016.
 */
var core_1 = require('@angular/core');
var SemesterListComponent = (function () {
    function SemesterListComponent(_semesterService) {
        this._semesterService = _semesterService;
        this.pageTitle = 'Semester List';
    }
    SemesterListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._semesterService.getSemesters()
            .subscribe(function (prefixes) { return _this.semesters = semesters; }, function (error) { return console.log('get error: ', error); });
    };
    SemesterListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'semester-list.component.html'
        }), 
        __metadata('design:paramtypes', [Object])
    ], SemesterListComponent);
    return SemesterListComponent;
}());
exports.SemesterListComponent = SemesterListComponent;
//# sourceMappingURL=semester-list.component.js.map