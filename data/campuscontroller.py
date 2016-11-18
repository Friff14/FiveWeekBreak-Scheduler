import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


# campus_id = Column(Integer, primary_key=True)
# campus_name = Column(String(64), nullable=False)

class CampusController(object):
    def put(self, data):
        campus = session.query(Campus).filter(Campus.campus_id == data['campus_id']).first()
        campus.campus_name = data['campus_name']

    def post(self, data):
        inserted_campus = Campus(
            campus_name=data['campus_name']
        )
        session.add(inserted_campus)

    def get(self, data):
        x = session.query(Campus).filter(Campus.campus_id == data['campus_id']).first()
        if x:
            return x.to_data()
        else:
            return {"error": 'Cannot retrieve; campus does not exist.'}

    def delete(self, data):
        to_delete = session.query(Campus).filter(Campus.campus_id == data['campus_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; campus does not exist.'}

    def on_get(self, req, resp, campus_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"campus_id": campus_id}))

    def on_post(self, req, resp):
        resp.body = json.dumps(
            self.post(req.passed_parameters)
        )
