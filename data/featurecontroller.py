import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)


# session = DBSession(autocommit=True)
#
# session.begin()


# feature_id = Column(Integer, primary_key=True
# feature_name = Column(String(64), nullable=False)
# sections = relationship('Section')
# rooms = relationship('Room')

class FeatureController(object):
    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            feature = session.query(Feature).filter(Feature.feature_id == data['feature_id']).first()
            feature.feature_name = data['feature_name']

            return feature

    def post(self, data):
        session = DBSession()
        if 'feature_name' in data:
            inserted_feature = Feature(
                feature_name=data['feature_name']
            )
            session.add(inserted_feature)

            session.flush()
            session.refresh(inserted_feature)

            session.commit()

            return inserted_feature.to_data()

        elif 'feature' in data and 'room' in data:
            altered_feature = session.query(Feature).filter_by(feature_id=data['feature']).first()
            altered_room = session.query(Room).filter_by(room_id=data['room']).first()
            altered_room.features.append(altered_feature)
            session.flush()
            session.refresh(altered_feature)
            session.commit()
            return altered_feature.to_data()

        elif 'feature' in data and 'course' in data:
            altered_feature = session.query(Feature).filter_by(feature_id=data['feature']).first()
            altered_course = session.query(Course).filter_by(course_id=data['course']).first()
            altered_course.features.append(altered_feature)
            session.flush()
            session.refresh(altered_feature)
            session.commit()
            return altered_feature.to_data()

    def get(self, data, req):
        session = DBSession()
        if type(data['feature_id']) == int:
            x = session.query(Feature).filter(Feature.feature_id == data['feature_id']).first()
            if x:
                return x.to_data()
            else:
                return {"error": 'Cannot retrieve; feature does not exist.'}
        else:
            features = session.query(Feature)
            ret = []

            for feature in features:
                ret.append(feature.to_data(top_level=(data['feature_id'] != 'list')))
            return ret

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Feature).filter(Feature.feature_id == data['feature_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; feature does not exist.'}

    def on_get(self, req, resp, feature_id=None):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(
            self.get({"feature_id": feature_id}, req)
        )

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
