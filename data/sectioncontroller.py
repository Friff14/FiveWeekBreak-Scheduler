import json

import falcon

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

            return section.to_data()

    def post(self, data):
        session = DBSession()
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
        resp.body = json.dumps(
            self.post(req.passed_parameters)
        )

    def on_put(self, req, resp):
        pass

    def on_delete(self, req, resp):
        pass
