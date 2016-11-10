from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()

# course_id = Column(Integer, primary_key=True)
# course_name = Column(String(64), nullable=False)
# course_credit_hours = Column(Float, nullable=False)
# course_description = Column(String(255))
# prefix_id = Column(Integer, ForeignKey('prefix.prefix_id'))
# prefix = relationship('Prefix')

def put(data):
    course = session.query(Course).filter(course_id=data['course_id']).first()
    course.course_name = data['course_name']
    course.course_credit_hours = data['course_credit_hours']
    course.course_description = data['course_description']
    course.prefix_id = data['prefix_id']
    # ...and so on


def post(data):
    inserted_course = Course(
        course_name=data['course_name'],
        course_credit_hours=data['course_credit_hours'],
        course_description=data['course_description'],
        prefix_id=data['prefix_id']
    )
    session.add(inserted_course)


def get(data):
    x = session.query(Course).filter(course_id=data['course_id']).first()
    if x:
        return x.to_data()
    else:
        return {"error": 'Cannot retrieve; course does not exist.'}


def delete(data):
    to_delete = session.query(Course).filter(course_id=data['course_id']).first()
    if to_delete:
        session.delete(to_delete)
    else:
        return {"error": 'Cannot delete; course does not exist.'}
