from dotenv import load_dotenv
from flask import Flask, request
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from datetime import timedelta

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
	'pool_pre_ping': True,
	'pool_recycle': 300,
}

app.json.compact = False

ALLOWED_ORIGINS = set(os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(","))

# Connect React to Flask
CORS(app,
	resources={r"/*": {"origins": list(ALLOWED_ORIGINS)}}, 
	allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
	)

#DB setup
metadata = MetaData(naming_convention={
	"ix": "ix_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
	"pk": "pk_%(table_name)s",
})
db = SQLAlchemy(metadata=metadata)
db.init_app(app)

bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)
