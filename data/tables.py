import math
from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy import Time
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, class_mapper
from sqlalchemy import Table
import datetime
from time import mktime

Base = declarative_base()


def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        if getattr(row, column.name):
            d[column.name] = str(getattr(row, column.name))
        else:
            d[column.name] = None
    return d


# # # # # # # # # # # # # # # # #   Tables  # # # # # # # # # # # # # # # # #
#
# So basically, each class created here is added to the database as a table.
#
# We can add functions to these classes that also include the database stuff.
#
# Each table has a to_data() function that returns a dictionary object that
#  can easily be translated to json to return for the API. to_data() takes an
#  option argument top_level, which makes it return more data if true, so we
#  can call a class's to_data within another's, without having an infinite
#  loop making the dictionary infinitely huge.
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# # Tables with no dependencies # #

# Instructor
class Instructor(Base):
    __tablename__ = 'instructor'
    instructor_id = Column(Integer, primary_key=True)
    instructor_first_name = Column(String(255), nullable=False)
    instructor_last_name = Column(String(255), nullable=False)
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
        # returned_data = row2dict(self)
        returned_data={
            "semester_id": self.semester_id,
            "semester_name": self.semester_name,
            "semester_start_date": datetime.datetime.strftime(self.semester_start_date, "%d %B %Y"),
            "semester_end_date": datetime.datetime.strftime(self.semester_end_date, "%d %B %Y")
        }
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
            returned_data['buildings'] = []
            for building in self.buildings:
                returned_data['buildings'].append(building.to_data())
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
    course_number = Column(String(5), nullable=False)
    course_credit_hours = Column(Float, nullable=False)
    course_description = Column(String(255))

    prefix_id = Column(Integer, ForeignKey('prefix.prefix_id'))
    prefix = relationship('Prefix')

    sections = relationship('Section', back_populates='course')

    # Feature
    features = relationship("Feature",
                            secondary="courseFeature",
                            back_populates='courses'
                            )

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        if top_level:
            if self.prefix:
                returned_data['prefix'] = self.prefix.to_data(top_level=False)
            returned_data['sections'] = []
            for section in self.sections:
                returned_data['sections'].append(section.to_data(top_level=False))
            returned_data['features'] = []
            for feature in self.features:
                returned_data['features'].append(feature.to_data(top_level=False))

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
            if self.campus:
                returned_data['campus'] = self.campus.to_data(top_level=False)
        return returned_data

    def get_full_room_name(self):
        pass


# # More layers # #


courseFeature = Table('courseFeature', Base.metadata,
                      Column('course_id', Integer, ForeignKey('course.course_id')),
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
            returned_data['features'] = []
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

    courses = relationship("Course",
                           secondary=courseFeature,
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
            returned_data['rooms'] = []
            returned_data['courses'] = []
            for room in self.rooms:
                returned_data['rooms'].append(room.to_data(top_level=False))
            for course in self.courses:
                returned_data['courses'].append(course.to_data(top_level=False))

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

        return returned_data


# ScheduleTime
class ScheduleTime(Base):
    __tablename__ = 'schedule_time'
    schedule_time_id = Column(Integer, primary_key=True)
    schedule_time_day_of_week = Column(String(2), nullable=False)
    schedule_time_start_time = Column(Time, nullable=False)
    schedule_time_end_time = Column(Time, nullable=False)

    section_id = Column(Integer, ForeignKey('section.section_id'))
    section = relationship('Section')

    def calc_length(self):
        m1 = self.schedule_time_end_time.hour * 60 + self.schedule_time_end_time.minute
        m2 = self.schedule_time_start_time.hour * 60 + self.schedule_time_start_time.minute
        return math.ceil((m1 - m2)/60)

    def to_data(self, top_level=True):
        returned_data = row2dict(self)
        returned_data['length'] = self.calc_length()
        if top_level:
            returned_data['section'] = self.section.to_data(top_level=False)
        return returned_data


# # Build # #

engine = create_engine('sqlite:///schedule.db')

Base.metadata.create_all(engine)
