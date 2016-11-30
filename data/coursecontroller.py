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
        if data['course_id']:
            courses = session.query(Course).filter(Course.course_id == data['course_id']).first()
            if courses:
                return courses.to_data()
            else:
                return {"error": 'Cannot retrieve; course does not exist.'}
        else:
            courses = session.query(Course)
            if 'prefix' in req.params:
                courses = courses.filter(Course.prefix_id.in_(req.params['prefix']))
            data = []
            for course in courses:
                data.append(course.to_data())

            return data

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Course).filter(Course.course_id == data['course_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; course does not exist.'}

    def on_get(self, req, resp, course_id=None):
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
