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
 * Created by bpalm_000 on 11/28/2016.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var PrefixService = (function () {
    function PrefixService(_http) {
        this._http = _http;
        this._prefixUrl = 'http://localhost:8000/prefix/';
    }
    PrefixService.prototype.getPrefixes = function () {
        return this._http.get(this._prefixUrl)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    PrefixService.prototype.getPrefix = function (id) {
        console.log(this._prefixUrl + String(id));
        return this._http.get(this._prefixUrl + String(id))
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this.handleError);
    };
    PrefixService.prototype.putPrefixForm = function (prefix) {
        console.log('putting prefix: ', prefix);
        var body = JSON.stringify(prefix);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this._prefixUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PrefixService.prototype.postPrefixForm = function (prefix) {
        console.log('posting prefix: ', prefix);
        var body = JSON.stringify(prefix);
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._prefixUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PrefixService.prototype.extractData = function (res) {
        var body = res.json();
        return body.fields || {};
    };
    PrefixService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('post error: ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    PrefixService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PrefixService);
    return PrefixService;
}());
exports.PrefixService = PrefixService;
//# sourceMappingURL=prefix.service.js.map