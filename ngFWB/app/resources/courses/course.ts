import { IPrefix } from '../prefixes/prefix';

export interface ICourse {//extends IResource {
    course_id: number;
    course_name: string;
    course_number: string;
    course_description: string;
    course_credit_hours: number;
    prefix_id: number;
}

