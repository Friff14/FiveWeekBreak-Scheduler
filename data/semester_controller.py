from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()

# semester_id = Column(Integer, primary_key=True
# semester_name = Column(String(64), nullable=False)
# semester_start_date = Column(DateTime, nullable=False)
# semester_end_date = Column(DateTime, nullable=False)
# sections = relationship('Section')


def put(data):
    semester = session.query(Semester).filter(semester_id=data['semester_id']).first()
    semester.semester_name = data['semester_name']
    semester.semester_start_date = data['semester_start_date']
    semester.semester_end_date = data['semester_end_date']


def post(data):
    inserted_semester = Semester(
        semester_name=data['semester_name'],
        semester_start_date=data['semester_start_date'],
        semester_end_date=data['semester_end_date']
    )
    session.add(inserted_semester)


def get(data):
    x = session.query(Semester).filter(semester_id=data['semester_id']).first()
    if x:
        return x.to_data()
    else:
        return {"error": 'Cannot retrieve; semester does not exist.'}


def delete(data):
    to_delete = session.query(Semester).filter(semester_id=data['semester_id']).first()
    if to_delete:
        session.delete(to_delete)
    else:
        return {"error": 'Cannot delete; semester does not exist.'}
