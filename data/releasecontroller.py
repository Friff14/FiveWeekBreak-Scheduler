import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


class ReleaseController(object):
    def put(self, data):
        release = session.query(Release).filter(Release.release_id == data['release_id']).first()
        release.release_name = data['release_name']
        release.release_hours = data['release_hours']
        release.instructor_id = data['instructor_id']
        # ...and so on

    def post(self, data):
        inserted_release = Release(
            release_name=data['release_name'],
            release_hours=data['release_hours'],
            instructor_id=data['instructor_id']
        )
        session.add(inserted_release)

    def get(self, data):
        x = session.query(Release).filter(Release.release_id == data['release_id']).first()
        if x:
            return x.to_data()
        else:
            return {"error": 'Hey, man, that\'s a bad burrito'}

    def delete(self, data):
        to_delete = session.query(Release).filter(Release.release_id == data['release_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; release does not exist.'}

    def on_get(self, req, resp, release_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"release_id": release_id}))

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
