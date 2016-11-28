import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)


# session = DBSession(autocommit=True)

# session.begin()


class PrefixController(object):
    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            prefix = session.query(Prefix).filter(Prefix.prefix_id == data['prefix_id']).first()
            prefix.prefix_name = data['prefix_name']

            return prefix.to_data()

    def post(self, data):
        session = DBSession()
        inserted_course = Prefix(
            prefix_name=data['prefix_name']
        )
        if 'courses' in data:
            q = session.query(Course).filter(Course.course_id.in_(data['courses']))
            inserted_course.courses = q.all()

        session.add(inserted_course)

        session.flush()
        session.refresh(inserted_course)

        session.commit()

        return inserted_course.to_data()

    def get(self, data, req):
        session = DBSession()
        if data:
            prefixes = session.query(Prefix).filter(Prefix.prefix_id == data['prefix_id']).first()
            if prefixes:
                return prefixes.to_data()
            else:
                return {"error": 'Hey, man, that\'s a bad burrito'}
        else:
            prefixes = session.query(Prefix)
            ret = []
            for prefix in prefixes:
                ret.append(prefix.to_data())
            return ret

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Prefix).filter(Prefix.prefix_id == data['prefix_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; instructor does not exist.'}

    def on_get(self, req, resp, prefix_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"prefix_id": prefix_id}, req))

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
