import json
from flask import make_response
from reponse_operations.ResponseGenerator import ResponseGenerator


class JsonResponseGenerator(ResponseGenerator):

    def generate_response(self, data, status_code):
        response = json.dumps(data)
        return make_response(response, status_code, {'Content-Type': 'application/json'})