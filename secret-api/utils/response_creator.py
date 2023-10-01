import json
import xml.etree.ElementTree as ElementTree
from flask import make_response


def generate_json_response(data):
    status_code = 200
    if data is None:
        status_code = 500
    response = json.dumps(data)
    return make_response(response, status_code, {'Content-Type': 'application/json'})


def generate_xml_response(name, data):
    status_code = 200
    if data is None:
        status_code = 500
    root = ElementTree.Element(f"{name}")
    for name, value in data:
        element = ElementTree.SubElement(root, name)
        element.text = value
    response = ElementTree.tostring(root, encoding='utf-8', method='xml')
    return make_response(response, status_code, {'Content-Type': 'application/xml'})


def generate_response(name, accept_header, data):
    if 'application/json' in accept_header:
        return generate_json_response(data)

    elif 'application/xml' in accept_header:
        return generate_xml_response(name, data)
    else:
        return "Unsupported 'Accept' header", None
