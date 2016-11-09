from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


def put():
    pass


def post(data):
    inserted_instructor = Instructor(
        instructor_name=data['instructor_name'],
        instructor_hours_required=data['instructor_hours_required'],
        instructor_notes=data['instructor_notes']
    )
    session.add(inserted_instructor)


def get():
    pass


def delete():
    pass
