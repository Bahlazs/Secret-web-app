from reponse_operations.JsonResponseGenerator import JsonResponseGenerator
from reponse_operations.XmlResponseGenerator import XmlResponseGenerator


def chose_response_generator(accept_header):
    if 'application/json' in accept_header:
        return JsonResponseGenerator()

    elif 'application/xml' in accept_header:
        return XmlResponseGenerator()
    else:
        return {"error": "Unsupported media type"}, 415
