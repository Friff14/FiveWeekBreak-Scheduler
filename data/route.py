from wsgiref import simple_server

import falcon

from data import buildingcontroller, campuscontroller, coursecontroller, featurecontroller
from data import instructorcontroller, semestercontroller, sectioncontroller, roomcontroller, prefixcontroller

app = application = falcon.API('application/json')


def process_response(req, resp):
    resp.add_header('Access-Control-Allow-Origin', 'localhost')


instructor = instructorcontroller.InstructorController()
semester = semestercontroller.SemesterController()
section = sectioncontroller.SectionController()
room = roomcontroller.RoomController()
prefix = prefixcontroller.PrefixController()
building = buildingcontroller.BuildingController()
campus = campuscontroller.CampusController()
course = coursecontroller.CourseController()
feature = featurecontroller.FeatureController()

app.add_route('/instructor/{instructor_id}', instructor)
app.add_route('/instructor/', instructor)
app.add_route('/semester/{semester_id}', semester)
app.add_route('/section/{section_id}', section)
app.add_route('/room/{room_id}', room)
app.add_route('/prefix/{prefix_id}', prefix)
app.add_route('/building/{building_id}', building)
app.add_route('/campus/{campus_id}', campus)
app.add_route('/course/{course_id}', course)
app.add_route('/feature/{feature_id}', feature)

if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 8000, app)
    httpd.serve_forever()
