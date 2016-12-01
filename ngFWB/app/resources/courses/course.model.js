"use strict";
var Course = (function () {
    function Course(
        // public course_id: number,
        course_name, course_description, course_credit_hours, prefix) {
        this.course_name = course_name;
        this.course_description = course_description;
        this.course_credit_hours = course_credit_hours;
        this.prefix = prefix;
    }
    return Course;
}());
exports.Course = Course;
//# sourceMappingURL=course.model.js.map