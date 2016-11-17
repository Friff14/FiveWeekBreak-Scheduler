import falcon


class CrossOriginHeader:
    def process_response(self, req, resp, resource, req_succeeded):
        resp.append_header('Access-Control-Allow-Origin', '*')
