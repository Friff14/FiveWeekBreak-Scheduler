import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


# feature_id = Column(Integer, primary_key=True
# feature_name = Column(String(64), nullable=False)
# sections = relationship('Section')
# rooms = relationship('Room')

class FeatureController(object):
    def put(self, data):
        with session.no_autoflush:
            feature = session.query(Feature).filter(Feature.feature_id == data['feature_id']).first()
            feature.feature_name = data['feature_name']

            return feature

    def post(self, data):
        inserted_feature = Feature(
            feature_name=data['feature_name']
        )
        session.add(inserted_feature)

        session.flush()
        session.refresh(inserted_feature)

        return inserted_feature.to_data()

    def get(self, data):
        x = session.query(Feature).filter(Feature.feature_id == data['feature_id']).first()
        if x:
            return x.to_data()
        else:
            return {"error": 'Cannot retrieve; feature does not exist.'}

    def delete(self, data):
        to_delete = session.query(Feature).filter(Feature.feature_id == data['feature_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; feature does not exist.'}

    def on_get(self, req, resp, feature_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"feature_id": feature_id}))

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
