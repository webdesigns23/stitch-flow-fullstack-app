from models import *
from marshmallow import Schema, fields, validate, ValidationError
from datetime import datetime

#Schemas
class ProjectSchema(Schema):
	id = fields.Integer(dump_only=True)
	title = fields.String(required=True)
	status = fields.String(required=True)
	notes = fields.String(required=True)
	created_at = fields.DateTime(required=True)
	updated_at = fields.DateTime(required=True)
	
	#relationship
	# pattern = db.relationship("Pattern", back_populates="projects")
	# project_materials = db.relationship("ProjectMaterial", back_populates="project", cascade="all, delete-orphan")

class PatternSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True)
	brand = fields.String(required=True)
	pattern_number = fields.String(required=True)
	category = fields.String(required=True)
	notes = fields.String(required=False)

	# #relationship
	# projects = db.relationship("Project", back_populates="pattern")
	# pattern_requirements = db.relationship("PatternRequirements", back_populates="pattern", cascade="all, delete-orphan")

class PatternRequirementSchema(Schema):
	id = fields.Integer(dump_only=True)
	role = fields.String(required=True)
	material_type = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	unit = 	fields.String(required=True)
	notes = fields.String(required=False)

	# pattern_id = db.Column(db.Integer, db.ForeignKey('patterns.id'), nullable=False, index=True)
	# #relationship
	# pattern = db.relationship("Pattern", back_populates="pattern_requirements")



class MaterialSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True)
	type = fields.String(required=True)
	color = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	price = fields.Decimal(as_string=True, places=2, required=True)
	supplier = fields.String(required=True)
	notes = fields.String(required=False)

	# #relationship
	# project_materials = db.relationship("ProjectMaterial", back_populates="material")


class ProjectMaterialSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True)
	role = fields.String(required=True)
	material_type = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	unit = fields.String(required=True)
	notes = notes = fields.String(required=False)

	# #relationship
	# project = db.relationship("Project", back_populates="project_materials")
	# material = db.relationship("Material", back_populates="project_materials")
