/**
 * Created by Tanner_2 on 11/27/2016.
 */

import { ISection } from '../sections/section';

export interface ISemester {
    semester_id: number;
    semester_name: string;
    semester_start_date: Date; // Is there a date/time type?
    semester_end_date: Date;  // Same as above.
    section: ISection;
}