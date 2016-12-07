import {ISectionTime} from "./section-time";
export class Section {
    constructor(
    public section_id: number,
    public section_name: string,
    public section_crn: string,
    public section_capacity: number,
    public course_id: number,
    public instructor_id: number,
    public semester_id: number,
    public room_id: number,
    public schedule_times: ISectionTime[] = []


    ){}
}