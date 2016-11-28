import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
# session = DBSession(autocommit=True)

# session.begin()

key_error = falcon.HTTPBadRequest(
    'Argument List Incomplete',
    'You must include all the arguments to make this request'
)


class CourseController(object):
    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            course = session.query(Course).filter(Course.course_id == data['course_id']).first()
            course.course_name = data['course_name']
            course.course_credit_hours = data['course_credit_hours']
            course.course_description = data['course_description']
            course.prefix_id = data['prefix_id']

            return course.to_data()

    def post(self, data):
        session = DBSession()
        inserted_course = Course(
            course_name=data['course_name'],
            course_credit_hours=data['course_credit_hours'],
            course_description=data['course_description'],
            prefix_id=data['prefix_id']
        )
        session.add(inserted_course)

        session.flush()
        session.refresh(inserted_course)

        session.commit()

        return inserted_course.to_data()

    def get(self, data, req):
        session = DBSession()
        if data:
            x = session.query(Course).filter(Course.course_id == data['course_id']).first()
            if x:
                return x.to_data()
            else:
                return {"error": 'Cannot retrieve; course does not exist.'}
        else:

            x = session.query(Course)
            if 'prefix' in req.params:
                x.filter(Course.prefix_id.in_(req.params['prefix']))

            ret = []
            for course in x:
                ret.append(course.to_data())

            return ret

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Course).filter(Course.course_id == data['course_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; course does not exist.'}

    def on_get(self, req, resp, course_id):
        resp.status = falcon.HTTP_200
        resp.body = '[' + json.dumps(self.get({"course_id": course_id}, req)) + ']'
        resp.set_header('Access-Control-Allow-Origin', '*')

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
