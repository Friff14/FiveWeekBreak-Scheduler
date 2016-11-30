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
var prefix_model_1 = require('./prefix.model');
var prefix_service_1 = require("./prefix.service");
var PrefixFormComponent = (function () {
    function PrefixFormComponent(prefixService) {
        this.prefixService = prefixService;
        this.pageTitle = 'Add Prefix';
        this.model = new prefix_model_1.Prefix('CS');
    }
    PrefixFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        this.prefixService.postPrefixForm(this.model)
            .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
    };
    PrefixFormComponent = __decorate([
        core_1.Component({
            selector: 'prefix-form',
            moduleId: module.id,
            templateUrl: 'prefix-form.component.html'
        }), 
        __metadata('design:paramtypes', [prefix_service_1.PrefixService])
    ], PrefixFormComponent);
    return PrefixFormComponent;
}());
exports.PrefixFormComponent = PrefixFormComponent;
//# sourceMappingURL=prefix-form.component.js.map