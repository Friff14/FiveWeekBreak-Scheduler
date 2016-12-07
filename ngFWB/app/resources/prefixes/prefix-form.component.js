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
var common_1 = require('@angular/common');
var prefix_model_1 = require('./prefix.model');
var prefix_service_1 = require("./prefix.service");
var router_1 = require('@angular/router');
var PrefixFormComponent = (function () {
    function PrefixFormComponent(prefixService, location, _route) {
        this.prefixService = prefixService;
        this.location = location;
        this._route = _route;
        this.pageTitle = 'Add Prefix';
        this.model = new prefix_model_1.Prefix('~~~');
    }
    //TODO: DO A PUT IF THE ID IS NOT THERE.
    PrefixFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        if (this.id) {
            this.prefixService.putPrefixForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
        else {
            this.prefixService.postPrefixForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
    };
    PrefixFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = "Edit Prefix: " + this.id;
            console.log(this.prefixService.getPrefix(this.id));
            this.prefixService.getPrefix(this.id)
                .subscribe(function (prefix) { return _this.model = prefix; }, function (error) { return console.log('get error: ', error); });
        }
    };
    PrefixFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    PrefixFormComponent = __decorate([
        core_1.Component({
            selector: 'prefix-form',
            moduleId: module.id,
            templateUrl: 'prefix-form.component.html'
        }), 
        __metadata('design:paramtypes', [prefix_service_1.PrefixService, common_1.Location, router_1.ActivatedRoute])
    ], PrefixFormComponent);
    return PrefixFormComponent;
}());
exports.PrefixFormComponent = PrefixFormComponent;
//# sourceMappingURL=prefix-form.component.js.map