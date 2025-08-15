from models import *
from marshmallow import Schema, fields, validate, ValidationError
from datetime import datetime

#Schemas
class ProjectSchema(Schema):
	__tablename__ = "projects"

	id = fields.Integer(dump_only=True)
	title = fields.String(required=True)
	status = fields.String(required=True)
	notes = fields.String(required=True)
	created_at = fields.DateTime(required=True)
	updated_at = fields.DateTime(required=True)
	
	#relationship
	# pattern = db.relationship("Pattern", back_populates="projects")
	# project_materials = db.relationship("ProjectMaterial", back_populates="project", cascade="all, delete-orphan")

# class PatternSchema(Schema):
# 	__tablename__ = "patterns"

# 	id = db.Column(db.Integer, primary_key=True)
# 	name = fields.String(required=True)
# 	brand = fields.String(required=True)
# 	pattern_number = fields.String(required=True)
# 	category = fields.String(required=True)
# 	notes = fields.String(required=True)

# 	#relationship
# 	projects = db.relationship("Project", back_populates="pattern")
# 	pattern_requirements = db.relationship("PatternRequirements", back_populates="pattern", cascade="all, delete-orphan")

# class PatternRequirementSchema(Schema):
# 	__tablename__ = "pattern_requirements"

# 	id = db.Column(db.Integer, primary_key=True)
# 	role = db.Column(db.String, nullable=False)
# 	material_type = db.Column(db.String, nullable=False)
# 	quantity = db.Column(db.Numeric(precision=8, scale=2), nullable=False)
# 	unit = db.Column(db.String, nullable=False)
# 	notes = db.Column(db.Text, nullable=True)
# 	pattern_id = db.Column(db.Integer, db.ForeignKey('patterns.id'), nullable=False, index=True)

# 	#relationship
# 	pattern = db.relationship("Pattern", back_populates="pattern_requirements")



# class MaterialSchema(Schema):
# 	__tablename__ = "materials"

# 	id = db.Column(db.Integer, primary_key=True)
# 	name = db.Column(db.String, nullable=False)
# 	type = db.Column(db.String, nullable=False)
# 	color = db.Column(db.String, nullable=True)
# 	quantity = db.Column(db.Numeric(precision=8, scale=2), nullable=False)
# 	price = db.Column(db.Numeric(precision=8, scale=2), nullable=True)
# 	supplier = db.Column(db.String, nullable=True)
# 	notes = db.Column(db.Text, nullable=True)

# 	#relationship
# 	project_materials = db.relationship("ProjectMaterial", back_populates="material")


# class ProjectMaterialSchema(Schema):
# 	__tablename__ = "project_materials"

# 	id = db.Column(db.Integer, primary_key=True)
# 	project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False, index=True)
# 	material_id = db.Column(db.Integer, db.ForeignKey("materials.id"), nullable=True, index=True)
# 	name = db.Column(db.String)
# 	role = db.Column(db.String)
# 	material_type = db.Column(db.String)
# 	quantity = db.Column(db.Numeric(precision=8, scale=2))
# 	unit = db.Column(db.String)
# 	notes = db.Column(db.Text, nullable=True)

# 	#relationship
# 	project = db.relationship("Project", back_populates="project_materials")
# 	material = db.relationship("Material", back_populates="project_materials")
