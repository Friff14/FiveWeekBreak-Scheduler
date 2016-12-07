"use strict";
var Section = (function () {
    function Section(section_id, section_name, section_crn, section_capacity, course_id, instructor_id, semester_id, room_id, schedule_times) {
        if (schedule_times === void 0) { schedule_times = []; }
        this.section_id = section_id;
        this.section_name = section_name;
        this.section_crn = section_crn;
        this.section_capacity = section_capacity;
        this.course_id = course_id;
        this.instructor_id = instructor_id;
        this.semester_id = semester_id;
        this.room_id = room_id;
        this.schedule_times = schedule_times;
    }
    return Section;
}());
exports.Section = Section;
//# sourceMappingURL=section.model.js.map