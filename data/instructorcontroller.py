import json

import falcon

from data.tables import *
from data import middleware

DBSession = sessionmaker(bind=engine)
# session = DBSession(autocommit=True)
#
# session.begin()

key_error = falcon.HTTPBadRequest(
    'Argument List Incomplete',
    'You must include all the arguments to make this request'
)


class InstructorController(object):
    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            instructor = session.query(Instructor).filter(instructor_id=data['instructor_id']).first()
            instructor.instructor_first_name = data['instructor_first_name']
            instructor.instructor_last_name = data['instructor_last_name']
            instructor.instructor_hours_required = data['instructor_hours_required']
            instructor.instructor_notes = data['instructor_notes']

            return instructor

    def post(self, data):
        session = DBSession()
        inserted_instructor = Instructor(
            instructor_first_name=data['instructor_first_name'],
            instructor_last_name=data['instructor_last_name'],
            instructor_hours_required=data['instructor_hours_required'],
            instructor_notes=data['instructor_notes']
        )
        session.add(inserted_instructor)
        session.flush()
        session.refresh(inserted_instructor)

        session.commit()

        return inserted_instructor.to_data()

    def get(self, data, req):
        session = DBSession()
        if data['instructor_id']:
            x = session.query(Instructor).filter(Instructor.instructor_id == data['instructor_id']).first()
            if x:
                return x.to_data()
            else:
                return {"error": 'Hey, man, that\'s a bad burrito'}
        else:
            instructors = session.query(Instructor)

            if req.params:
                if 'release' in req.params:
                    instructors.filter_by(release=req.params['release'])
                if 'section' in req.params:
                    instructors.filter_by(course=req.params['course'])
            data = []
            for instructor in instructors:
                data.append(instructor.to_data())
            return data

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Instructor).filter(instructor_id=data['instructor_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; instructor does not exist.'}

    def on_get(self, req, resp, instructor_id=None):
        resp.status = falcon.HTTP_200
        resp.body = '[' + json.dumps(self.get({"instructor_id": instructor_id}, req)) + ']'
        resp.set_header('Access-Control-Allow-Origin', '*')

    def on_post(self, req, resp):
        resp.body = json.dumps(
            self.post(req.passed_parameters)
        )
        resp.set_header('Access-Control-Allow-Origin', '*')

    def on_put(self, req, resp):
        resp.body = json.dumps(
            self.put(req.passed_parameters)
        )

    def on_delete(self, req, resp):
        resp.body = json.dumps(
            self.delete(req.passed_parameters)
        )


if __name__ == '__main__':
    pass
