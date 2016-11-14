import falcon
import json
from data import instructorcontroller
from wsgiref import simple_server

app = falcon.API()

instructor = instructorcontroller.InstructorController()

app.add_route('/instructor/{instructor_id}', instructor)

if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 8000, app)
    httpd.serve_forever()
