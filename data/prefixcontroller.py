import json
import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


# prefix_id = Column(Integer, primary_key=True)
# prefix_name = Column(String(16), nullable=False)
# courses = relationship('Course', back_populates='prefix')

class PrefixController(object):
    def put(self, data):
        prefix = session.query(Prefix).filter(Prefix.prefix_id == data['prefix_id']).first()
        prefix.prefix_name = data['prefix_name']
        # prefix.courses = data['courses']
        # ...and so on

    def post(self, data):
        inserted_course = Prefix(
            prefix_name=data['prefix_name'],
            courses=data['courses']
        )
        session.add(inserted_course)

    def get(self, data):
        x = session.query(Prefix).filter(Prefix.prefix_id == data['prefix_id']).first()
        if x:
            return x.to_data()
        else:
            return {"error": 'Hey, man, that\'s a bad burrito'}

    def delete(self, data):
        to_delete = session.query(Prefix).filter(Prefix.prefix_id == data['prefix_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; instructor does not exist.'}

    def on_get(self, req, resp, prefix_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"prefix_id": prefix_id}))
