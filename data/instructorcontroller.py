import json

import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()

key_error = falcon.HTTPBadRequest(
    'Argument List Incomplete',
    'You must include all the arguments to make this request'
)




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
        session.refresh(inserted_instructor)

        return inserted_instructor.to_data()

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
        resp.body = '[' + json.dumps(self.get({"instructor_id": instructor_id})) + ']'
        resp.set_header('Access-Control-Allow-Origin', '*')

    def on_post(self, req, resp):
        try:
            args = {
                "instructor_name": req.context['instructor_name'],
                "instructor_hours_required": req.context["instructor_hours_required"],
                "instructor_notes": req.context["instructor_notes"]
            }

        except KeyError:
            raise key_error

        resp.body = json.dumps(
            self.post(args)
        )
