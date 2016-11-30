import { IPrefix } from '../prefixes/prefix';

export class Course {//extends IResource {
    constructor(
    // public course_id: number,
    public course_name: string,
    public course_description: string,
    public course_credit_hours: number,
    public prefix: IPrefix
    ){}
}