#!/usr/bin/env python3
from config import app, db, api, jwt, migrate

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

#Register Resources
from resources.projects import register_project_resources
from resources.patterns import register_pattern_resources

register_project_resources(api)
register_pattern_resources(api)

if __name__ == '__main__':
    app.run(port=5555, debug=True)