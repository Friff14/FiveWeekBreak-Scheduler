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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var SemesterService = (function () {
    function SemesterService(_http) {
        this._http = _http;
        this._semesterUrl = 'http://localhost:8000/semester/';
    }
    SemesterService.prototype.getSemesters = function () {
        return this._http.get('http://localhost:8000/semester/list')
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    SemesterService.prototype.getSemester = function (id) {
        console.log(this._semesterUrl + String(id));
        return this._http.get(this._semesterUrl + String(id))
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    SemesterService.prototype.putSemesterForm = function (semester) {
        console.log('putting semester: ', semester);
        var body = JSON.stringify(semester);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this._semesterUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SemesterService.prototype.postSemesterForm = function (semester) {
        console.log('posting semester: ', semester);
        var body = JSON.stringify(semester);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._semesterUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SemesterService.prototype.extractData = function (res) {
        var body = res.json();
        return body.fields || {};
    };
    SemesterService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('post error: ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    SemesterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SemesterService);
    return SemesterService;
}());
exports.SemesterService = SemesterService;
//# sourceMappingURL=semester.service.js.map