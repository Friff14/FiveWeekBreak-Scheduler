"use strict";
/**
 * Created by doebo on 11/27/2016.
 */
var Room = (function () {
    function Room(room_id, room_name, room_capacity, building_id) {
        this.room_id = room_id;
        this.room_name = room_name;
        this.room_capacity = room_capacity;
        this.building_id = building_id;
    }
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=room.model.js.map