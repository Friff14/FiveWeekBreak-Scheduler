import falcon
import json
from data import instructor_controller
from wsgiref import simple_server

app = falcon.API()

instructor = instructor_controller.instructor_controller()

app.add_route('/instructor/{instructor_id}', instructor)

if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 8000, app)
    httpd.serve_forever()
