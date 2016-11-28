"use strict";
/**
 * Created by Tanner_2 on 11/27/2016.
 */
var Semester = (function () {
    function Semester(
        //public semester_id: number,
        semester_name, semester_start_date, semester_end_date) {
        this.semester_name = semester_name;
        this.semester_start_date = semester_start_date;
        this.semester_end_date = semester_end_date;
    }
    return Semester;
}());
exports.Semester = Semester;
//# sourceMappingURL=semester.model.js.map