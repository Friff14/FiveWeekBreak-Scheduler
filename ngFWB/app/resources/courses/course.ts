import { IPrefix } from '../prefixes/prefix';

export interface ICourse {//extends IResource {
    course_id: number;
    course_name: string;
    course_description: string;
    course_credit_hours: string;
    prefix: IPrefix;
}

