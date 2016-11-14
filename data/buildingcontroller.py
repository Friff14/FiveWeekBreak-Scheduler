import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


# building_id = Column(Integer, primary_key=True)
# building_name = Column(String(64), nullable=False)
# building_abbreviation = Column(String(8), nullable=False)
# campus_id = Column(Integer, ForeignKey('campus.campus_id'))
# campus = relationship('Campus')

class BuildingController(object):
    def put(self, data):
        building = session.query(Building).filter(Building.building_id == data['building_id']).first()
        building.building_name = data['building_name']
        building.building_abbreviation = data['building_abbreviation']
        building.campus_id = data['campus_id']


    def post(self, data):
        inserted_building = Building(
            building_name=data['building_name'],
            building_abbreviation=data['building_abbreviation'],
            campus_id=data['campus_id']
        )
        session.add(inserted_building)


    def get(self, data):
        x = session.query(Building).filter(Building.building_id == data['building_id']).first()
        if x:
            return x.to_data()
        else:
            return {"error": 'Cannot retrieve; building does not exist.'}


    def delete(self, data):
        to_delete = session.query(Building).filter(Building.building_id == data['building_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; building does not exist.'}

    def on_get(self, req, resp, building_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"building_id": building_id}))