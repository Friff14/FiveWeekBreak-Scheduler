from wsgiref import simple_server

import falcon

from data import buildingcontroller, campuscontroller, coursecontroller, featurecontroller
from data import instructorcontroller, semestercontroller, sectioncontroller, roomcontroller, prefixcontroller
from data import middleware, releasecontroller, csv_creation

app = application = falcon.API('application/json',
                               middleware=[
                                   middleware.CrossOriginHeader(),
                                   middleware.JSONDecoding()
                               ])

instructor = instructorcontroller.InstructorController()
semester = semestercontroller.SemesterController()
section = sectioncontroller.SectionController()
room = roomcontroller.RoomController()
prefix = prefixcontroller.PrefixController()
building = buildingcontroller.BuildingController()
campus = campuscontroller.CampusController()
course = coursecontroller.CourseController()
feature = featurecontroller.FeatureController()
release = releasecontroller.ReleaseController()
xlsx = csv_creation.xlsx_creation()

app.add_route('/instructor/{instructor_id}', instructor)
app.add_route('/instructor/', instructor)
app.add_route('/semester/{semester_id}', semester)
app.add_route('/semester/{semester_id}/{full}', semester)
app.add_route('/semester/', semester)
app.add_route('/section/{section_id}', section)
app.add_route('/section/', section)
app.add_route('/room/{room_id}', room)
app.add_route('/room/', room)
app.add_route('/prefix/', prefix)
app.add_route('/prefix/{prefix_id}', prefix)
app.add_route('/building/{building_id}', building)
app.add_route('/building/', building)
app.add_route('/campus/{campus_id}', campus)
app.add_route('/campus/', campus)
app.add_route('/course/{course_id}', course)
app.add_route('/course/', course)
app.add_route('/feature/{feature_id}', feature)
app.add_route('/feature/', feature)
app.add_route('/release/{release_id}', release)
app.add_route('/release/', release)
app.add_route('/xlsx/{semester}/output.xlsx', xlsx)

if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 8000, app)
    httpd.serve_forever()
