import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
# session = DBSession(autocommit=True)
#
# session.begin()


class ReleaseController(object):
    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            release = session.query(Release).filter(Release.release_id == data['release_id']).first()
            release.release_name = data['release_name']
            release.release_hours = data['release_hours']
            release.instructor_id = data['instructor_id']

            return release.to_data()

    def post(self, data):
        session = DBSession()
        inserted_release = Release(
            release_name=data['release_name'],
            release_hours=data['release_hours'],
            instructor_id=data['instructor_id']
        )
        session.add(inserted_release)

        session.flush()
        session.refresh(inserted_release)

        session.commit()

        return inserted_release.to_data()

    def get(self, data, req):
        session = DBSession()
        if is_int(data['release_id']):
            x = session.query(Release).filter(Release.release_id == data['release_id']).first()
            if x:
                return x.to_data()
            else:
                return {"error": 'Hey, man, that\'s a bad burrito'}
        else:
            releases = session.query(Release)
            ret = []
            for release in releases:
                ret.append(release.to_data(top_level=(data['release_id'] != 'list')))
            return ret

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Release).filter(Release.release_id == data['release_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; release does not exist.'}

    def on_get(self, req, resp, release_id=None):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"release_id": release_id}, req))

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
