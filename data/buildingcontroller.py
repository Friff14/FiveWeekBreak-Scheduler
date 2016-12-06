import json
import falcon
from data import middleware

from data.tables import *

DBSession = sessionmaker(bind=engine)


# session = DBSession(autocommit=True)
#
# session.begin()


# building_id = Column(Integer, primary_key=True)
# building_name = Column(String(64), nullable=False)
# building_abbreviation = Column(String(8), nullable=False)
# campus_id = Column(Integer, ForeignKey('campus.campus_id'))
# campus = relationship('Campus')

class BuildingController(object):
    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            building = session.query(Building).filter(Building.building_id == data['building_id']).first()
            building.building_name = data['building_name']
            building.building_abbreviation = data['building_abbreviation']
            building.campus_id = data['campus_id']

            return building.to_data()

    def post(self, data):
        session = DBSession()
        inserted_building = Building(
            building_name=data['building_name'],
            building_abbreviation=data['building_abbreviation'],
            campus_id=data['campus_id']
        )
        session.add(inserted_building)
        session.flush()
        session.refresh(inserted_building)

        session.commit()

        return inserted_building.to_data()

    def get(self, data, req):
        session = DBSession()
        if is_int(data['building_id']):
            x = session.query(Building).filter(Building.building_id == data['building_id']).first()
            if x:
                return x.to_data()
            else:
                return {"error": 'Cannot retrieve; building does not exist.'}
        else:
            buildings = session.query(Building)
            if 'campus' in req.params:
                buildings = buildings.filter_by(campus_id=req.params['campus'])
            ret = []
            for building in buildings:
                ret.append(building.to_data(top_level=(data['building_id'] != 'list')))
            return ret

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Building).filter(Building.building_id == data['building_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; building does not exist.'}

    def on_get(self, req, resp, building_id=None):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"building_id": building_id}, req))

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
