"use strict";
/**
 * Created by adsal on 11/26/2016.
 */
var Instructor = (function () {
    function Instructor(instructor_first_name, instructor_last_name, instructor_hours_required, instructor_notes) {
        this.instructor_first_name = instructor_first_name;
        this.instructor_last_name = instructor_last_name;
        this.instructor_hours_required = instructor_hours_required;
        this.instructor_notes = instructor_notes;
    }
    return Instructor;
}());
exports.Instructor = Instructor;
//# sourceMappingURL=instructor.model.js.map