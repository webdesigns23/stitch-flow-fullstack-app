from models import *
from marshmallow import Schema, fields, validate

#Status allowed string
allowed_project_status = [
	"planning", "cutting", "ready_to_sew",  "sewing", "final_touches", "complete"]

#Category allowed string
allowed_pattern_category = [
	"clothing", "accessories", "quilting", "home_decor", "costumes", "other"
]

#Project image types
allowed_image_types = [
	"inspiration", "design", "fabric", "measurements", "in_progress", "finished"
]

#Schemas
class UserSchema(Schema):
	id = fields.Integer(dump_only=True)	
	display_name = fields.String(required=True)
	email = fields.Email(required=True)

	#relationship
	projects = fields.Nested(lambda: ProjectSchema(exclude=("user",)), many=True, dump_only=True)
	patterns = fields.Nested(lambda: PatternSchema(exclude=("user",)), many=True, dump_only=True)
	

class ProjectImageSchema(Schema):
	id = fields.Integer(dump_only=True)
	cloudinary_public_id = fields.String(dump_only=True)
	secure_url = fields.String(dump_only=True)
	image_type = fields.String(required=True, validate=validate.OneOf(allowed_image_types))
	notes = fields.String(required=False, validate=validate.Length(max=250))
	created_at = fields.DateTime(dump_only=True, format ="%m/%d/%Y")

	#nested relationship
	project = fields.Nested(lambda: ProjectSchema(exclude=("project_images",)), dump_only=True)


class ProjectSchema(Schema):
	id = fields.Integer(dump_only=True)
	title = fields.String(required=True, validate=validate.Length(max=35))
	status = fields.String(validate=validate.OneOf(allowed_project_status), load_default="planning")
	deadline = fields.Date(required=True, format="%m/%d/%Y")
	measurement_notes = fields.String(required=False, validate=validate.Length(max=100))
	notes = fields.String(required=False, validate=validate.Length(max=500))
	created_at = fields.DateTime(dump_only=True, format="%m/%d/%Y")
	updated_at = fields.DateTime(dump_only=True, format="%m/%d/%Y")
	pattern_id = fields.Integer(load_only=True)
	user_id = fields.Integer(required=True, load_only=True)

	#nested relationship
	pattern = fields.Nested(lambda:PatternSchema(exclude=("projects",)), dump_only=True)
	user = fields.Nested(lambda: UserSchema(exclude=("projects", "patterns")), dump_only=True)
	project_images = fields.Nested(lambda:ProjectImageSchema(exclude=("project",)), many=True, dump_only=True)
	


class PatternRequirementSchema(Schema):
	id = fields.Integer(dump_only=True)
	role = fields.String(required=True)
	material_type = fields.String(required=True)
	quantity = fields.Decimal(as_string=True, places=2, required=True)
	unit = 	fields.String(required=True)
	size = fields.String(required=True, validate=validate.Length(max=100))


class PatternSchema(Schema):
	id = fields.Integer(dump_only=True)
	name = fields.String(required=True, validate=validate.Length(max=35))
	brand = fields.String(required=True)
	pattern_number = fields.String(required=True)
	category = fields.String(validate=validate.OneOf(allowed_pattern_category))
	notes = fields.String(required=False, validate=validate.Length(max=100))
	user_id = fields.Integer(required=True)

	#nested relationship
	projects = fields.Nested(lambda: ProjectSchema(exclude=("pattern",)), many=True)
	pattern_requirements = fields.List(fields.Nested(PatternRequirementSchema()), dump_only=True)
	user = fields.Nested(lambda: UserSchema(exclude=("patterns", "projects")), dump_only=True)
	

