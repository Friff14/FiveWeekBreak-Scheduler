from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, class_mapper
from sqlalchemy import Table

Base = declarative_base()


def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))
    return d


# # Tables with no dependencies # #

# Instructor
class Instructor(Base):
    __tablename__ = 'instructor'
    instructor_id = Column(Integer, primary_key=True)
    instructor_name = Column(String(255), nullable=False)
    instructor_hours_required = Column(Float)
    instructor_notes = Column(String(255))
    release = relationship('Release', back_populates='instructor')

    sections = relationship('Section', back_populates='instructor')

    def to_data(self, top_level=True):

        returned_data = row2dict(self)
        if top_level:
            returned_data['release'] = []
            for release_obj in self.release:
                returned_data['release'].append(release_obj.to_data(top_level=False))
            returned_data['sections'] = []
            for section in self.sections:
                returned_data['sections'].append(section.to_data(top_level=False))

        return returned_data


# Semester
class Semester(Base):
    __tablename__ = 'semester'
    semester_id = Column(Integer, primary_key=True)
    semester_name = Column(String(32), nullable=False)
    semester_start_date = Column(DateTime, nullable=False)
    semester_end_date = Column(DateTime, nullable=False)
    sections = relationship('Section', back_populates='semester')

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            returned_data['sections'] = []
            for section in self.sections:
                returned_data['sections'].append(section.to_data(top_level=False))
        return returned_data


# Prefix
class Prefix(Base):
    __tablename__ = 'prefix'
    prefix_id = Column(Integer, primary_key=True)
    prefix_name = Column(String(16), nullable=False)
    courses = relationship('Course', back_populates='prefix')

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            returned_data['courses'] = []
            for course in self.courses:
                returned_data['courses'].append(course.to_data())
        return returned_data


# Campus
class Campus(Base):
    __tablename__ = 'campus'
    campus_id = Column(Integer, primary_key=True)
    campus_name = Column(String(64), nullable=False)
    campus_address = Column(String(255))
    buildings = relationship('Building', back_populates='campus')

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            for building in self.buildings:
                returned_data['buildings'] = building.to_data()
        return returned_data


# # Single-dependency tables # #

# Release
class Release(Base):
    __tablename__ = 'release'
    release_id = Column(Integer, primary_key=True)
    release_name = Column(String(64), nullable=False)
    release_hours = Column(Integer, nullable=False)
    instructor_id = Column(Integer, ForeignKey('instructor.instructor_id'))
    instructor = relationship('Instructor')

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            returned_data['instructor'] = self.instructor.to_data(top_level=False)
        return returned_data


# Course
class Course(Base):
    __tablename__ = 'course'
    course_id = Column(Integer, primary_key=True)
    course_name = Column(String(64), nullable=False)
    course_credit_hours = Column(Float, nullable=False)
    course_description = Column(String(255))
    prefix_id = Column(Integer, ForeignKey('prefix.prefix_id'))
    prefix = relationship('Prefix')

    sections = relationship('Section', back_populates='course')

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            returned_data['prefix'] = self.prefix.to_data(top_level=False)
            returned_data['sections'] = []
            for section in self.sections:
                returned_data['sections'].append(section.to_data(top_level=False))
        return returned_data


# Building
class Building(Base):
    __tablename__ = 'building'
    building_id = Column(Integer, primary_key=True)
    building_name = Column(String(64), nullable=False)
    building_abbreviation = Column(String(16), nullable=False)
    campus_id = Column(Integer, ForeignKey('campus.campus_id'))
    campus = relationship('Campus')
    rooms = relationship('Room', back_populates='building')

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            returned_data['rooms'] = []
            for room in self.rooms:
                returned_data['rooms'].append(room.to_data(top_level=False))
            returned_data['campus'] = self.campus.to_data(top_level=False)
        return returned_data


# # More layers # #

sectionFeature = Table('sectionFeature', Base.metadata,
                       Column('section_id', Integer, ForeignKey('section.section_id')),
                       Column('feature_id', Integer, ForeignKey('feature.feature_id'))
                       )

roomFeature = Table('roomFeature', Base.metadata,
                    Column('feature_id', Integer, ForeignKey('feature.feature_id')),
                    Column('room_id', Integer, ForeignKey('room.room_id'))
                    )


# Room
class Room(Base):
    __tablename__ = 'room'
    room_id = Column(Integer, primary_key=True)
    room_name = Column(String(64), nullable=False)
    room_capacity = Column(Integer, nullable=False)

    building_id = Column(Integer, ForeignKey('building.building_id'))
    building = relationship('Building')

    sections = relationship('Section', back_populates='room')

    features = relationship('Feature',
                            secondary=roomFeature,
                            back_populates='rooms'
                            )

    def calc_room_name(self):
        # TODO: Add campus and building name
        return self.room_name

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        returned_data['full_room_name'] = self.calc_room_name()
        if top_level:
            returned_data['building'] = self.building.to_data(top_level=False)
            returned_data['sections'] = []
            for section in self.sections:
                returned_data['sections'].append(section.to_data(top_level=False))
            for feature in self.features:
                returned_data['features'].append(feature.to_data(top_level=False))
        return returned_data


# Feature
class Feature(Base):
    __tablename__ = 'feature'
    feature_id = Column(Integer, primary_key=True)
    feature_name = Column(String(64), nullable=False)

    sections = relationship("Section",
                            secondary=sectionFeature,
                            back_populates='features'
                            )

    rooms = relationship("Room",
                         secondary=roomFeature,
                         back_populates='features'
                         )

    # TODO: Add feature connectivity to room and course

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            for room in self.rooms:
                returned_data['rooms'].append(room.to_data(top_level=False))
            for section in self.sections:
                returned_data['sections'].append(section.to_data(top_level=False))

        return returned_data


# Section
class Section(Base):
    __tablename__ = 'section'
    section_id = Column(Integer, primary_key=True)
    section_name = Column(String(64), nullable=False)
    section_crn = Column(String(32))
    section_capacity = Column(Integer)

    # Course
    course_id = Column(Integer, ForeignKey('course.course_id'))
    course = relationship('Course')

    # Instructor
    instructor_id = Column(Integer, ForeignKey('instructor.instructor_id'))
    instructor = relationship('Instructor')

    # Semester
    semester_id = Column(Integer, ForeignKey('semester.semester_id'))
    semester = relationship('Semester')

    # Room
    room_id = Column(Integer, ForeignKey('room.room_id'))
    room = relationship('Room')

    # ScheduleTime
    schedule_times = relationship('ScheduleTime', back_populates='section')

    # Feature
    features = relationship("Feature",
                            secondary=sectionFeature,
                            back_populates='sections'
                            )

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            returned_data['course'] = self.course.to_data(top_level=False)
            returned_data['semester'] = self.semester.to_data(top_level=False)
            returned_data['room'] = self.room.to_data(top_level=False)
            returned_data['instructor'] = self.instructor.to_data(top_level=False)
            returned_data['times'] = []
            for time in self.schedule_times:
                returned_data['times'].append(time.to_data(top_level=False))
            for feature in self.features:
                returned_data['features'].append(feature.to_data(top_level=False))

        return returned_data

    

# ScheduleTime
class ScheduleTime(Base):
    __tablename__ = 'schedule_time'
    schedule_time_id = Column(Integer, primary_key=True)
    schedule_time_day_of_week = Column(String(2), nullable=False)
    schedule_time_start_time = Column(DateTime, nullable=False)
    schedule_time_end_time = Column(DateTime, nullable=False)

    section_id = Column(Integer, ForeignKey('section.section_id'))
    section = relationship('Section')

    def calc_length(self):
        # TODO: Make this function work
        return self.schedule_time_id

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        returned_data['length'] = self.calc_length()
        if top_level:
            returned_data['section'] = self.section.to_data(top_level=False)
        return returned_data


# # Build # #

engine = create_engine('sqlite:///schedule.db')

Base.metadata.create_all(engine)
