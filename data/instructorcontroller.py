import json

import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


class InstructorController(object):
    def put(self, data):
        instructor = session.query(Instructor).filter(instructor_id=data['instructor_id']).first()
        instructor.instructor_name = data['instructor_name']
        instructor.instructor_hours_required = data['instructor_hours_required']
        instructor.instructor_notes = data['instructor_notes']
        # ...and so on

    def post(self, data):
        inserted_instructor = Instructor(
            instructor_name=data['instructor_name'],
            instructor_hours_required=data['instructor_hours_required'],
            instructor_notes=data['instructor_notes']
        )
        session.add(inserted_instructor)

    def get(self, data):
        x = session.query(Instructor).filter(Instructor.instructor_id == data['instructor_id']).first()
        if x:
            return x.to_data()
        else:
            return {"error": 'Hey, man, that\'s a bad burrito'}

    def delete(self, data):
        to_delete = session.query(Instructor).filter(instructor_id=data['instructor_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; instructor does not exist.'}

    def on_get(self, req, resp, instructor_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"instructor_id": instructor_id}))
