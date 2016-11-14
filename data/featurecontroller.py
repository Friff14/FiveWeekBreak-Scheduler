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
        feature = session.query(Feature).filter(Feature.feature_id == data['feature_id']).first()
        feature.feature_name = data['feature_name']
        # feature.sections = data['sections']
        # feature.rooms = data['rooms']

    def post(self, data):
        inserted_feature = Feature(
            feature_name=data['feature_name']
            # sections=data['sections'],
            # rooms=data['rooms']
        )
        session.add(inserted_feature)

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
