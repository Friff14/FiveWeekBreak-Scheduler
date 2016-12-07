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
var room_service_1 = require('./room.service');
var RoomFormComponent = (function () {
    function RoomFormComponent(roomService, location) {
        this.roomService = roomService;
        this.location = location;
        this.pageTitle = 'Add Room';
    }
    RoomFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    RoomFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'room-form.component.html'
        }), 
        __metadata('design:paramtypes', [room_service_1.RoomService, common_1.Location])
    ], RoomFormComponent);
    return RoomFormComponent;
}());
exports.RoomFormComponent = RoomFormComponent;
//# sourceMappingURL=room-form.component.js.map