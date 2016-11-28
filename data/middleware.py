import json

import falcon


class Authentication:
    def process_request(self, req, resp, resource):
        pass


class JSONDecoding:
    def process_request(self, req, resp):
        x = req.stream.read()
        if x:
            req.passed_parameters = json.loads(x.decode('utf-8'))


class CrossOriginHeader:
    def process_response(self, req, resp, resource, req_succeeded):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Credentials', "true")
        resp.set_header('Access-Control-Max-Age', '1000')
        resp.set_header('Access-Control-Allow-Headers',
                        "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding")
        resp.set_header('Access-Control-Allow-Methods', "POST, GET, OPTIONS, DELETE, PUT")
