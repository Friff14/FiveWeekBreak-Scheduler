import falcon
import json
from data import instructorcontroller, semestercontroller, sectioncontroller, roomcontroller
from wsgiref import simple_server

app = falcon.API()

instructor = instructorcontroller.InstructorController()
semester = semestercontroller.SemesterController()
section = sectioncontroller.SectionController()
room = roomcontroller.RoomController()

app.add_route('/instructor/{instructor_id}', instructor)
app.add_route('/semester/{semester_id}', semester)
app.add_route('/section/{section_id}', section)
app.add_route('/room/{room_id}', room)

if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 8000, app)
    httpd.serve_forever()
