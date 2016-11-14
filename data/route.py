import falcon
import json
from data import instructorcontroller, semestercontroller
from wsgiref import simple_server

app = falcon.API()

instructor = instructorcontroller.InstructorController()
semester = semestercontroller.SemesterController()

app.add_route('/instructor/{instructor_id}', instructor)
app.add_route('/semester/{semester_id}', semester)

if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 8000, app)
    httpd.serve_forever()
