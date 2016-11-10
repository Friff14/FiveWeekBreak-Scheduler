from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()

#prefix_id = Column(Integer, primary_key=True)
#prefix_name = Column(String(16), nullable=False)
#courses = relationship('Course', back_populates='prefix')

def put(data):
    prefix = session.query(Prefix).filter(prefix_id=data['prefix_id']).first()
    prefix.prefix_name = data['prefix_name']
   # prefix.courses = data['courses']
    # ...and so on


def post(data):
    inserted_course = Prefix(
        prefix_name=data['prefix_name'],
        courses=data['courses']
    )
    session.add(inserted_course)


def get(data):
    x = session.query(Prefix).filter(prefix_id=data['prefix_id']).first()
    if x:
        return x.to_data()
    else:
        return {"error": 'Hey, man, that\'s a bad burrito'}


def delete():
    pass
