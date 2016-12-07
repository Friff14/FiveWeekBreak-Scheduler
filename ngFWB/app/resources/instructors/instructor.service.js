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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var InstructorService = (function () {
    function InstructorService(_http, jsonp) {
        this._http = _http;
        this.jsonp = jsonp;
        this._instructorUrl = 'http://localhost:8000/instructor/';
        this._otherInstructorUrl = 'mockapi/mock-instructors.json';
    }
    InstructorService.prototype.getInstructors = function () {
        return this._http.get(this._instructorUrl)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // getInstructors(): Observable<IInstructor[]> {
    //   return this._http.get(this._otherInstructorUrl)
    //     .map(this.extractData)
    //     //.do(data => console.log(JSON.stringify(data)))
    //     .catch(this.handleError);
    // }
    InstructorService.prototype.getInstructor = function (id) {
        console.log(this._otherInstructorUrl + String(id));
        return this._http.get(this._otherInstructorUrl + String(id))
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    // getInstructors(): Observable<IInstructor[]> {
    //     return this.jsonp.get(this._instructorUrl)
    //                 .map((response: Response) => <IInstructor[]> response.json())
    //                 .do(data => console.log(JSON.stringify(data)))
    //                 .catch(this.handleError);
    // }
    // getInstructors(): Observable<IInstructor[]> {
    //   return this._http.get(this._otherInstructorUrl)
    //     .map((response: Response) => <IInstructor[]> response.json())
    //     .do(data => console.log(JSON.stringify(data)))
    //     .catch(this.handleError);
    // }
    //getInstructors(): Observable<Instructor[]> {
    //    return this._http.get(this._instructorUrl)
    //        .map((response: Response) => <Instructor[]> response.json())
    //        .do(data => console.log(JSON.stringify(data)))
    //        .catch(this.handleError);
    //}
    // getInstructor(id: number): Observable<IInstructor> {
    //     return this.getInstructors()
    //         .map((instructors: IInstructor[]) => instructors.find(i => i.instructor_id === id));
    // }
    // getInstructor(id: number): Observable<IInstructor> {
    //     return this.getInstructors()
    //         .map((instructors: IInstructor[]) => instructors.find(i => i.instructor_id === id));
    // }
    InstructorService.prototype.putInstructorForm = function (instructor) {
        console.log('putting instructor: ', instructor);
        var body = JSON.stringify(instructor);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this._instructorUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    InstructorService.prototype.postInstructorForm = function (instructor) {
        console.log('posting instructor: ', instructor);
        var body = JSON.stringify(instructor);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._instructorUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    InstructorService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    // private handleError(error: Response) {
    //     // in a real world app, we may send the server to some remote logging infrastructure
    //     // instead of just logging it to the console
    //     console.error('post error: ', error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }
    InstructorService.prototype.handleError = function (error) {
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
    InstructorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], InstructorService);
    return InstructorService;
}());
exports.InstructorService = InstructorService;
//# sourceMappingURL=instructor.service.js.map