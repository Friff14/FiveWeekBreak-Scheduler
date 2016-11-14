from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


def put(data):
    instructor = session.query(Instructor).filter(instructor_id=data['instructor_id']).first()
    instructor.instructor_name = data['instructor_name']
    instructor.instructor_hours_required = data['instructor_hours_required']
    instructor.instructor_notes = data['instructor_notes']
    # ...and so on


def post(data):
    inserted_instructor = Instructor(
        instructor_name=data['instructor_name'],
        instructor_hours_required=data['instructor_hours_required'],
        instructor_notes=data['instructor_notes']
    )
    session.add(inserted_instructor)


def get(data):
    x = session.query(Instructor).filter(Instructor.instructor_id == data['instructor_id']).first()
    if x:
        return x.to_data()
    else:
        return {"error": 'Hey, man, that\'s a bad burrito'}


def delete(data):
    to_delete = session.query(Instructor).filter(instructor_id=data['instructor_id']).first()
    if to_delete:
        session.delete(to_delete)
    else:
        return {"error": 'Cannot delete; instructor does not exist.'}
