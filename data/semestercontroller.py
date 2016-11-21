import json

import falcon

from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


# semester_id = Column(Integer, primary_key=True
# semester_name = Column(String(64), nullable=False)
# semester_start_date = Column(DateTime, nullable=False)
# semester_end_date = Column(DateTime, nullable=False)
# sections = relationship('Section')

class SemesterController(object):

    def put(self, data):
        with session.no_autoflush:
            semester = session.query(Semester).filter(semester_id=data['semester_id']).first()
            semester.semester_name = data['semester_name']
            semester.semester_start_date = data['semester_start_date']
            semester.semester_end_date = data['semester_end_date']

            return semester.to_data()

    def post(self, data):
        inserted_semester = Semester(
            semester_name=data['semester_name'],
            semester_start_date=data['semester_start_date'],
            semester_end_date=data['semester_end_date']
        )
        session.add(inserted_semester)

        session.flush()
        session.refresh(inserted_semester)

        session.commit()

        return inserted_semester

    def get(self, data):
        x = session.query(Semester).filter(Semester.semester_id == data['semester_id']).first()
        if x:
            return x.to_data()
        else:
            return {"error": 'Cannot retrieve; semester does not exist.'}

    def delete(self, data):
        to_delete = session.query(Semester).filter(semester_id=data['semester_id']).first()
        if to_delete:
            session.delete(to_delete)
        else:
            return {"error": 'Cannot delete; semester does not exist.'}

    def on_get(self, req, resp, semester_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(self.get({"semester_id": semester_id}))

    def on_post(self, req, resp):
        resp.body = json.dumps(
            self.post(req.passed_parameters)
        )

    def on_put(self, req, resp):
        resp.body = json.dumps(
            self.put(req.passed_parameters)
        )

    def on_delete(self, req, resp):
        resp.body = json.dumps(
            self.delete(req.passed_parameters)
        )
