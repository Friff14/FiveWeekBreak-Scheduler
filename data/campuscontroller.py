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
        with session.no_autoflush:
            campus = session.query(Campus).filter(Campus.campus_id == data['campus_id']).first()
            campus.campus_name = data['campus_name']
            campus.campus_address = data['campus_address']

            return campus.to_data()

    def post(self, data):
        session = DBSession()
        inserted_campus = Campus(
            campus_name=data['campus_name'],
            campus_address = data['campus_address']
        )
        session.add(inserted_campus)
        session.flush()
        session.refresh(inserted_campus)

        session.commit()

        return inserted_campus.to_data()

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

    def on_put(self, req, resp):
        resp.body = json.dumps(
            self.put(req.passed_parameters)
        )

    def on_delete(self, req, resp):
        resp.body = json.dumps(
            self.delete(req.passed_parameters)
        )

