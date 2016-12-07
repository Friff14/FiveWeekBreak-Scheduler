"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Tanner_2 on 12/5/2016.
 */
var core_1 = require('@angular/core');
var CampusListComponent = (function () {
    function CampusListComponent() {
        this.pageTitle = 'Campus List';
    }
    CampusListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'campus-list.component.html'
        })
    ], CampusListComponent);
    return CampusListComponent;
}());
exports.CampusListComponent = CampusListComponent;
//# sourceMappingURL=campus-list.component.js.map