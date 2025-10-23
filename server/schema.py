from models import *
from marshmallow import Schema, fields, validate

#Status allowed string
allowed_project_status = [
	"planning", "ready_to_sew", "cutting", "sewing", "final_touches", "complete"]

#Category allowed string
allowed_pattern_category = [
	"clothing", "accessories", "quilting", "home_decor", "costumes", "other"
]

#Schemas
class UserSchema(Schema):
	id = fields.Integer(dump_only=True)
	display_name = fields.String(required=True)
	username = fields.String(required=True)
	
	#relationship
	projects = fields.Nested(lambda: ProjectSchema(exclude=("user",)), many=True, dump_only=True)
	patterns = fields.Nested(lambda: PatternSchema(exclude=("user",)), many=True, dump_only=True)
	materials = fields.Nested(lambda: MaterialSchema(exclude=("user",)), many=True, dump_only=True)


class ProjectSchema(Schema):
	id = fields.Integer(dump_only=True)
	title = fields.String(required=True, validate=validate.Length(max=35))
	status = fields.String(validate=validate.OneOf(allowed_project_status), load_default="planning")
	notes = fields.String(required=False, validate=validate.Length(max=100))
	created_at = fields.DateTime(dump_only=True, format="%m/%d/%Y")
	updated_at = fields.DateTime(dump_only=True, format="%m/%d/%Y")
	pattern_id = fields.Integer(load_only=True)
	user_id = fields.Integer(required=True, load_only=True)


	#nested relationship
	pattern = fields.Nested(lambda:PatternSchema(exclude=("projects",)), dump_only=True)
	project_materials = fields.Nested(lambda: ProjectMaterialSchema(exclude=("project", "material")), many=True, dump_only=True)
	user = fields.Nested(lambda: UserSchema(exclude=("projects", "patterns", "materials")), dump_only=True)


class PatternRequirementSchema(Schema):
	id = fields.Integer(dump_only=True)
	role = fields.String(required=True)
	material_type = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	unit = 	fields.String(required=True)
	size = fields.String(required=True, validate=validate.Length(max=100))

	#nested relationship
	pattern = fields.Nested(lambda:PatternSchema(exclude=("pattern_requirements", "projects")))


class PatternSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True, validate=validate.Length(max=35))
	brand = fields.String(required=True)
	pattern_number = fields.String(required=True)
	category = fields.String(validate=validate.OneOf(allowed_pattern_category))
	notes = fields.String(required=False, validate=validate.Length(max=100))

	user_id = fields.Integer(required=True)

	#nested relationship
	projects = fields.Nested(lambda: ProjectSchema(exclude=("pattern","project_materials")), many=True)
	pattern_requirements = fields.List(fields.Nested(PatternRequirementSchema(exclude=("pattern",))), dump_only=True)
	user = fields.Nested(lambda: UserSchema(exclude=("patterns", "projects", "materials")), dump_only=True)
	

class MaterialSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True, validate=validate.Length(max=35))
	material_type = fields.String(required=True)
	color = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	unit = 	fields.String(required=True)
	price = fields.Decimal(as_string=True, places=2, required=True)
	supplier = fields.String(required=True)
	notes = fields.String(required=False, validate=validate.Length(max=100))

	user_id = fields.Integer(required=True)

	#nested relationship
	project_materials = fields.Nested(lambda: ProjectMaterialSchema(), many=True, exclude=("project", "material"))
	user = fields.Nested(lambda: UserSchema(exclude=("materials","patterns", "projects")), dump_only=True)


class ProjectMaterialSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True, validate=validate.Length(max=35))
	role = fields.String(required=True)
	material_type = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	unit = fields.String(required=True)
	notes = fields.String(required=False, validate=validate.Length(max=100))

	#nested relationship
	project = fields.Nested(lambda:ProjectSchema(), many=False, exclude=("project_materials",))
	material = fields.Nested(lambda:MaterialSchema(), many=False, exclude=("project_materials",))
