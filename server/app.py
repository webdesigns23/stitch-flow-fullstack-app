#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import *
from schema import *

#Routes


if __name__ == '__main__':
    app.run(port=5555, debug=True)