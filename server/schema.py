from models import *
from marshmallow import Schema, fields, validate, ValidationError

#Status allowed string
allowed_project_status = [
	"planning", "ready to sew", "cutting", "sewing", "final touches", "complete"]

#Schemas
class ProjectSchema(Schema):
	id = fields.Integer(dump_only=True)
	title = fields.String(required=True, validate=validate.Length(max=35))
	status = fields.String(validate=validate.OneOf(allowed_project_status), load_default="planning")
	notes = fields.String(required=False, validate=validate.Length(max=100))
	created_at = fields.DateTime(dump_only=True)
	updated_at = fields.DateTime(dump_only=True)

	#nested relationship
	pattern = fields.Nested(lambda:PatternSchema(exclude=("projects",)))
	project_materials = fields.Nested(lambda: ProjectMaterialSchema, many=True, exclude=("project", "material"))


class PatternRequirementSchema(Schema):
	id = fields.Integer(dump_only=True)
	role = fields.String(required=True)
	material_type = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	unit = 	fields.String(required=True)
	notes = fields.String(required=False, validate=validate.Length(max=100))

	#nested relationship
	pattern = fields.Nested(lambda:PatternSchema(exclude=("pattern_requirments",)))


class PatternSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True, validate=validate.Length(max=35))
	brand = fields.String(required=True)
	pattern_number = fields.String(required=True)
	category = fields.String(required=True)
	notes = fields.String(required=False, validate=validate.Length(max=100))

	#nested relationship
	project = fields.Nested(lambda: ProjectSchema(exclude=("patterns",)))
	pattern_requirements = fields.List(fields.Nested(PatternRequirementSchema(exclude=("patttern",))))
	

class MaterialSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True, validate=validate.Length(max=35))
	material_type = fields.String(required=True)
	color = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	price = fields.Decimal(as_string=True, places=2, required=True)
	supplier = fields.String(required=True)
	notes = fields.String(required=False, validate=validate.Length(max=100))

	#nested relationship
	project_materials = fields.Nested(lambda: ProjectMaterialSchema, many=True, exclude=("project", "material"))


class ProjectMaterialSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True, validate=validate.Length(max=35))
	role = fields.String(required=True)
	material_type = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	unit = fields.String(required=True)
	notes = notes = fields.String(required=False, validate=validate.Length(max=100))

	#nested relationship
	project = fields.Nested(lambda:ProjectSchema, many=False, exclude=("project_materials",))
	material = fields.Nested(lambda:MaterialSchema, many=False, exclude=("project_materials",))
