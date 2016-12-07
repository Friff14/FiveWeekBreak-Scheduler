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
var room_model_1 = require("./room.model");
var router_1 = require("@angular/router");
var RoomFormComponent = (function () {
    function RoomFormComponent(roomService, location, _route) {
        this.roomService = roomService;
        this.location = location;
        this._route = _route;
        this.pageTitle = 'Add Room';
        this.model = new room_model_1.Room(null, '', null, null);
    }
    RoomFormComponent.prototype.submitForm = function (form) {
        console.log(this.model);
        if (this.id) {
            this.roomService.putRoomForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
        else {
            this.roomService.postRoomForm(this.model)
                .subscribe(function (data) { return console.log('success: ', data); }, function (err) { return console.log('error: ', err); });
        }
    };
    RoomFormComponent.prototype.ngOnInit = function () {
        // this.roomService.getCampuses()
        //     .subscribe(campuses => this.campuses = campuses,
        //         error => console.log('get error: ', error));
        var _this = this;
        this.roomService.getBuildings()
            .subscribe(function (buildings) { return _this.buildings = buildings; }, function (error) { return console.log('get error: ', error); });
        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = "Edit Prefix: " + this.id;
            this.roomService.getRoom(this.id)
                .subscribe(function (room) { return _this.model = room; }, function (error) { return console.log('get error: ', error); });
        }
    };
    RoomFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    RoomFormComponent = __decorate([
        core_1.Component({
            selector: 'room-form',
            moduleId: module.id,
            templateUrl: 'room-form.component.html'
        }), 
        __metadata('design:paramtypes', [room_service_1.RoomService, common_1.Location, router_1.ActivatedRoute])
    ], RoomFormComponent);
    return RoomFormComponent;
}());
exports.RoomFormComponent = RoomFormComponent;
//# sourceMappingURL=room-form.component.js.map