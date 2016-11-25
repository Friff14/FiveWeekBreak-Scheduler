import { ICourse } from '../courses/course';
import { IInstructor } from '../instructors/instructor';
import { ISemester } from '../semesters/semester';
import { IRoom } from '../rooms/room';

export interface ISection {
    section_id: number;
    section_name: string;
    section_crn: string;
    section_capacity: number;
    course: ICourse;
    instructor: IInstructor;
    semester: ISemester;
    room: IRoom;
}