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
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var SectionService = (function () {
    function SectionService(_http) {
        this._http = _http;
        this._sectionUrl = 'http://localhost:8000/section/';
    }
    // For the section list component
    // getSections(): Observable<ISection[]> {
    //   return this._http.get(this._sectionUrl)
    //     .map((response: Response) => <ISection[]> response.json())
    //   .do(data => console.log(JSON.stringify(data)))
    // .catch(this.handleError);
    // }
    //getSection(id: number): Observable<ISection> {
    //  return this.getSections()
    //    .map((sections: ISection[]) => sections.find(i => i.section_id === id));
    //}
    SectionService.prototype.getSections = function () {
        return this._http.get(this._sectionUrl)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    SectionService.prototype.getSection = function (id) {
        return this.getSections()
            .map(function (sections) { return sections.find(function (i) { return i.section_id === id; }); });
    };
    SectionService.prototype.postSectionForm = function (section) {
        console.log('posting section: ', section);
        var body = JSON.stringify(section);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._sectionUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SectionService.prototype.extractData = function (res) {
        var body = res.json();
        return body.fields || {};
    };
    SectionService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('post error: ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    SectionService = __decorate([
        core_1.Injectable()
    ], SectionService);
    return SectionService;
}());
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map