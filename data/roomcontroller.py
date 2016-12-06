import json

import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
# session = DBSession(autocommit=True)
#
# session.begin()


# room_id = Column(Integer, primary_key=True)
# room_name = Column(String(64), nullable=False)
# room_capacity = Column(Integer, nullable=False)
# building_id = Column(Integer, ForeignKey('building.building_id'))
# building = relationship('Building')

class RoomController(object):
    def put(self, data):
        session = DBSession()
        with session.no_autoflush:
            room = session.query(Room).filter(room_id=data['room_id']).first()
            room.room_name = data['room_name']
            room.room_capacity = data['room_capacity']
            room.building_id = data['building_id']

            return room.to_data()

    def post(self, data):
        session = DBSession()
        inserted_room = Room(
            room_name=data['room_name'],
            room_capacity=data['room_capacity'],
            building_id=data['building_id']
        )
        session.add(inserted_room)

        session.flush()
        session.refresh(inserted_room)

        session.commit()

        return inserted_room.to_data()

    def get(self, data, req):
        session = DBSession()
        if is_int(data['room_id']):
            x = session.query(Room).filter(Room.room_id == data['room_id']).first()
            if x:
                return x.to_data()
            else:
                return {"error": 'Cannot retrieve; room does not exist.'}
        else:
            rooms = session.query(Room)
            ret = []
            # Filter by building
            for room in rooms:
                ret.append(room.to_data(top_level=(data['room_id'] != 'list')))
            return ret

    def delete(self, data):
        session = DBSession()
        to_delete = session.query(Room).filter(room_id=data['room_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; room does not exist.'}

    def on_get(self, req, resp, room_id=None):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"room_id": room_id}, req))

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
