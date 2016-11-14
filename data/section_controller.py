from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


# section_id = Column(Integer, primary_key=True)
# section_name = Column(String(64), nullable=False)
# section_crn = Column(String(32))
# section_capacity = Column(Integer)
# # Course
# course_id = Column(Integer, ForeignKey('course.course_id'))
# course = relationship('Course')
#
# # Instructor
# instructor_id = Column(Integer, ForeignKey('instructor.instructor_id'))
# instructor = relationship('Instructor')
#
# # Semester
# semester_id = Column(Integer, ForeignKey('semester.semester_id'))
# semester = relationship('Semester')
#
# # Room
# room_id = Column(Integer, ForeignKey('room.room_id'))
# room = relationship('Room')
#
# # ScheduleTime
# schedule_times = relationship('ScheduleTime', back_populates='section')
#
# # Feature
# features = relationship("Feature",
#                         secondary=sectionFeature,
#                         back_populates='sections'
#                         )

def put(data):
    section = session.query(Section).filter(section_id=data['course_id']).first()
    section.section_name = data['section_name']
    section.seection_crn = data['section_crn']
    section.section_capacity = data['section_capacity']
    section.course_id = data['course_id']
    section.instructor_id = data['instructor_id']
    section.semester_id = data['semester_id']
    section.room_id = data['room_id']


def post(data):
    inserted_section = Section(
        section_name=data['section_name'],
        seection_crn=data['section_crn'],
        section_capacity=data['section_capacity'],
        course_id=data['course_id'],
        instructor_id=data['instructor_id'],
        semester_id=data['semester_id'],
        room_id=data['room_id']
    )
    session.add(inserted_section)


def get(data):
    x = session.query(Section).filter(section_id=data['section_id']).first()
    if x:
        return x.to_data()
    else:
        return {'Error': 'cannot retrieve section; section does not exist.'}


def delete(data):
    to_delete = session.query(Section).filter(section_id=data['section_id']).first()
    if to_delete:
        session.delete(to_delete)
    else:
        return {'Error': 'cannot delete section; section does not exist.'}
