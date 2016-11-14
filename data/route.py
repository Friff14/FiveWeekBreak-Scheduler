import falcon
import json
from data import instructor_controller
from wsgiref import simple_server


class InstructorController(object):
    def on_get(self, req, resp, instructor_id):
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(instructor_controller.get({"instructor_id": instructor_id}))


app = falcon.API()

instructor = InstructorController()


app.add_route('/instructor/{instructor_id}', instructor)


if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 8000, app)
    httpd.serve_forever()
