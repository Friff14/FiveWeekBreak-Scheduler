import json
import falcon
from data.tables import *
import datetime
from dateutil import parser

DBSession = sessionmaker(bind=engine)


class SemesterController(object):
    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            semester = session.query(Semester).filter(Semester.semester_id == data['semester_id']).first()
            semester.semester_name = data['semester_name']
            semester.semester_start_date = parser.parse(data['semester_start_date'])
            semester.semester_end_date = parser.parse(data['semester_end_date'])

            session.commit()

            return semester.to_data()

    def post(self, data):
        session = DBSession()
        inserted_semester = Semester(
            semester_name=data['semester_name'],
            semester_start_date=parser.parse(data['semester_start_date']),
            semester_end_date=parser.parse(data['semester_end_date'])
        )
        session.add(inserted_semester)

        session.flush()
        session.refresh(inserted_semester)

        session.commit()

        return inserted_semester.to_data()

    def get(self, data, req):
        session = DBSession()

        if data['full'] == 'all':
            ret = {'instructors': []}
            instructors = session.query(Instructor).filter(Section.semester_id == data['semester_id']) \
                .order_by(Instructor.instructor_last_name)
            count = 0
            for instructor in instructors:
                ret['instructors'].append(instructor.to_data())
                ins = ret['instructors'][count]
                sections = []
                for section in instructor.sections:
                    sections.append(section.to_data())
                ins['sections'] = sections
                count += 1

            return ret

        if is_int(data['semester_id']):
            x = session.query(Semester).filter(Semester.semester_id == data['semester_id']).first()
            if x:
                return x.to_data()
            else:
                return {"error": 'Cannot retrieve; semester does not exist.'}

        else:
            semesters = session.query(Semester)
            ret = []
            for semester in semesters:
                ret.append(semester.to_data(top_level=data['semester_id'] != 'list'))
            return ret

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Semester).filter(semester_id=data['semester_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; semester does not exist.'}

    def on_get(self, req, resp, semester_id=None, full=None):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"semester_id": semester_id, 'full': full}, req))

    def on_post(self, req, resp):
        resp.body = json.dumps(
            self.post(req.passed_parameters)
        )

    def on_put(self, req, resp):
        resp.body = json.dumps(
            self.put(req.passed_parameters)
        )

    def on_delete(self, req, resp):
        resp.body = json.dumps(
            self.delete(req.passed_parameters)
        )
