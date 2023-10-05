from reponse_operations.ResponseGenerator import ResponseGenerator
import xml.etree.ElementTree as ElementTree
from flask import make_response


class XmlResponseGenerator(ResponseGenerator):

    def generate_response(self, data, status_code):
        root = ElementTree.Element("data")
        for name, value in data.items():
            element = ElementTree.SubElement(root, name)
            element.text = value
        response = ElementTree.tostring(root, encoding='utf-8', method='xml')
        return make_response(response, status_code, {'Content-Type': 'application/xml'})
