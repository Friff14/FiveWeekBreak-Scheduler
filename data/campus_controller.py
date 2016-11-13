from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


# campus_id = Column(Integer, primary_key=True)
# campus_name = Column(String(64), nullable=False)


def put(data):
    campus = session.query(Campus).filter(campus_id=data['campus_id']).first()
    campus.campus_name = data['campus_name']


def post(data):
    inserted_campus = Campus(
        campus_name = data['campus_name']
    )
    session.add(inserted_campus)


def get(data):
    x = session.query(Campus).filter(campus_id=data['campus_id']).first()
    if x:
        return x.to_data()
    else:
        return {"error": 'Cannot retrieve; campus does not exist.'}


def delete(data):
    to_delete = session.query(Campus).filter(campus_id=data['campus_id']).first()
    if to_delete:
        session.delete(to_delete)
    else:
        return {"error": 'Cannot delete; campus does not exist.'}