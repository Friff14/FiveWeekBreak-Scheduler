"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var InstructorService2 = (function () {
    function InstructorService2(_http, _jsonp) {
        this._http = _http;
        this._jsonp = _jsonp;
        this._instructorUrl = 'http://localhost:8000/instructor/';
    }
    InstructorService2.prototype.getInstructors = function () {
        return this._jsonp.get(this._instructorUrl)
            .map(function (res) { return res.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    InstructorService2.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    InstructorService2 = __decorate([
        core_1.Injectable()
    ], InstructorService2);
    return InstructorService2;
}());
exports.InstructorService2 = InstructorService2;
//# sourceMappingURL=instructor.service2.js.map