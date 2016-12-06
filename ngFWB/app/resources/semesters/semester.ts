/**
 * Created by Tanner_2 on 11/27/2016.
 */

import { ISection } from '../sections/section';

export interface ISemester {
    semester_id: number;
    semester_name: string;
    semester_start_date: number; // Is there a date/time type?
    semester_end_date: number;  // Same as above.
    section: ISection;
}