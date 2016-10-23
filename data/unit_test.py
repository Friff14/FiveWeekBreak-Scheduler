#!/usr/bin/python3
import json
import datetime
from tables import *


def pretty_print(data):
    if hasattr(data, 'to_data'):
        data = data.to_data()

    print(json.dumps(
        data,
        sort_keys=True,
        indent=2,
    ))


# # Test # #
if __name__ == '__main__':
    print('Content-type:text/markdown\n')

    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    print('#POST\n')
    print('##Instructor')
    instructor = Instructor(
        instructor_name='Test Instructor',
        instructor_hours_required=12
    )
    pretty_print(instructor)
    session.add(instructor)

    print('##Release')

    release = Release(
        instructor=instructor,
        release_name='Test Release',
        release_hours=42,
        release_reason='Test Reason'
    )
    session.add(release)
    pretty_print(release)

    print('##Department')
    dept = Department(department_name='Test Dept')
    session.add(dept)
    pretty_print(dept)

    print('##Course')
    test_course_1 = Course(
        course_name='Test Course 1',
        department=dept,
        course_credit_hours=4.0
    )
    test_course_2 = Course(
        course_name='Test Course 2',
        department=dept,
        course_credit_hours=4.0
    )
    pretty_print(test_course_1)
    pretty_print(test_course_2)
    session.add(test_course_1)
    session.add(test_course_2)

    print('##Semester')
    semester = Semester(
        semester_name='Fall 2016',
        semester_start_date=datetime.datetime.strptime('20160830', '%Y%m%d'),
        semester_end_date=datetime.datetime.strptime('20161214', '%Y%m%d')
    )
    pretty_print(semester)
    session.add(semester)

    print('##Campus')
    campus = Campus(
        campus_name='WSU Ogden',
        campus_address='1600 Pennsylvania Ave'
    )
    session.add(campus)
    pretty_print(campus)

    print('##Building')
    building = Building(
        building_name='Technical Education',
        building_abbreviation='TE',
        campus=campus
    )
    session.add(building)
    pretty_print(building)

    print('##Room')
    room = Room(
        room_name='S201',
        room_size='30',
        building=building
    )
    session.add(room)
    pretty_print(room)

    print('##Section')
    section = Section(
        section_name='Test Section 1',
        section_capacity=30,
        course=test_course_1,
        instructor=instructor,
        room=room,
        semester=semester
    )
    session.add(section)
    pretty_print(section)

    print('#Get')
    pretty_print(
        session.query(Instructor).filter(
            Instructor.instructor_id == 1
        ).all()[-1]
    )
