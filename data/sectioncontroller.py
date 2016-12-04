import json

import dateutil
from sqlalchemy import Time
import falcon
from dateutil import parser
from datetime import datetime

from sqlalchemy import and_
from sqlalchemy import or_

from data.tables import *

DBSession = sessionmaker(bind=engine)


class SectionController(object):
    pass

    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            section = session.query(Section).filter(section_id=data['course_id']).first()
            section.section_name = data['section_name']
            section.seection_crn = data['section_crn']
            section.section_capacity = data['section_capacity']
            section.course_id = data['course_id']
            section.instructor_id = data['instructor_id']
            section.semester_id = data['semester_id']
            section.room_id = data['room_id']

            # for schedule_time in data['schedule_times']:
            #     inserted_time = ScheduleTime(
            #         schedule_time_day_of_week=schedule_time['schedule_time_day_of_week'],
            #         schedule_time_start_time=datetime.strptime(schedule_time['schedule_time_start_time'], '%H:%M').time(),
            #         schedule_time_end_time=datetime.strptime(schedule_time['schedule_time_end_time'], '%H:%M').time(),
            #         section_id=section.section_id
            #     )
            #     session.add(inserted_time)
            #     session.flush()
            #     session.refresh(inserted_time)
            #     session.commit()
            #
            #     return section.to_data()

    def post(self, data):
        session = DBSession()

        if 'schedule_times' not in data:
            return {"error": "No scheduled times!"}

        for schedule_time in data['schedule_times']:
            start_time = datetime.time(dateutil.parser.parse(schedule_time['schedule_time_start_time']))
            end_time = datetime.time(dateutil.parser.parse(schedule_time['schedule_time_end_time']))

            times = session.query(ScheduleTime) \
                .filter(Section.semester_id == data['semester_id']) \
                .filter(or_(or_(Section.instructor_id == data['instructor_id'],
                                Section.room_id == data['room_id']),
                            Section.course_id == data['course_id'])) \
                .filter(or_(and_(start_time <= ScheduleTime.schedule_time_end_time,
                                 start_time >= ScheduleTime.schedule_time_start_time),
                            and_(end_time <= ScheduleTime.schedule_time_end_time,
                                 end_time >= ScheduleTime.schedule_time_start_time)))

            if times.count() > 0:
                print(times.first().schedule_time_start_time)
                return {"error": "Conflict!"}

        inserted_section = Section(
            section_name=data['section_name'],
            section_crn=data['section_crn'],
            section_capacity=data['section_capacity'],
            course_id=data['course_id'],
            instructor_id=data['instructor_id'],
            semester_id=data['semester_id'],
            room_id=data['room_id']
        )

        session.add(inserted_section)

        session.flush()
        session.refresh(inserted_section)

        session.commit()

        for schedule_time in data['schedule_times']:
            inserted_time = ScheduleTime(
                schedule_time_day_of_week=schedule_time['schedule_time_day_of_week'],
                schedule_time_start_time=datetime.strptime(schedule_time['schedule_time_start_time'], '%H:%M').time(),
                schedule_time_end_time=datetime.strptime(schedule_time['schedule_time_end_time'], '%H:%M').time(),
                section_id=inserted_section.section_id
            )
            session.add(inserted_time)
            session.flush()
            session.refresh(inserted_time)
            session.commit()

        # session.refresh(inserted_section)
        # session.commit()

        return inserted_section.to_data()

    def get(self, data, req):
        session = DBSession()
        if type(data['section_id']) == int:
            x = session.query(Section).filter(Section.section_id == data['section_id']).first()
            if x:
                return x.to_data()
            else:
                return {'Error': 'cannot retrieve section; section does not exist.'}
        else:
            sections = session.query(Section)
            if 'course' in req.params:
                sections.filter_by(course_id=req.params['course'])
            if 'semester' in req.params:
                sections.filter_by(semester_id=req.params['semester'])
            if 'room' in req.params:
                sections.filter_by(room_id=req.params['room'])
            if 'instructor' in req.params:
                sections.filter_by(instructor_id=req.params['instructor'])

            ret = []
            for section in sections:
                ret.append(section.to_data(top_level=(data['section_id'] != 'list')))
            return ret

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Section).filter(section_id=data['section_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {'Error': 'cannot delete section; section does not exist.'}

    def on_get(self, req, resp, section_id=None):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"section_id": section_id}, req))

    def on_post(self, req, resp):
        data = self.post(req.passed_parameters)
        if "error" in data:
            resp.status = falcon.HTTP_409
        resp.body = json.dumps(data)

    def on_put(self, req, resp):
        pass

    def on_delete(self, req, resp):
        pass
