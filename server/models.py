from sqlalchemy.sql import func
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash

from config import db, bcrypt

allowed_image_types = [
	"design", "measurements", "fabric", "inspiration", "in_progress", "finished"
]

#Models
class User(db.Model):
	__tablename__ = 'users'

	id = db.Column(db.Integer, primary_key=True)
	display_name = db.Column(db.String, nullable=False)
	email = db.Column(db.String, unique=True, nullable=False)
	_password_hash = db.Column(db.String, nullable=False)

	#relationship
	projects = db.relationship("Project", back_populates = "user", cascade="all, delete-orphan")
	patterns = db.relationship("Pattern", back_populates = "user", cascade="all, delete-orphan")
		
	@validates('email')
	def normalize_email(self, key, value):
		return value.strip().lower()

	@hybrid_property
	def password_hash(self):
		raise AttributeError('Password hashes may not be viewed')
    
	@password_hash.setter
	def password_hash(self, password):
		password_hash = bcrypt.generate_password_hash(
			password.encode('utf-8'))
		self._password_hash = password_hash.decode('utf-8')
         
	def authenticate(self, password):
		return bcrypt.check_password_hash(
			self._password_hash, password.encode('utf-8'))

	def __repr__(self):
		return f'<User: {self.display_name}, {self.email}>'
	

class Project(db.Model):
	__tablename__ = "projects"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String, nullable=False)
	status = db.Column(db.String, default="planning", nullable=False)
	notes = db.Column(db.Text, nullable=True)
	deadline = db.Column(db.Date, nullable=True)
	measurement_notes = db.Column(db.String, nullable=True)
	created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
	updated_at = db.Column(db.DateTime, onupdate=func.now(), server_default=func.now())
	pattern_id = db.Column(db.Integer, db.ForeignKey('patterns.id'), nullable=True, index=True)
	user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))
	
	#relationship
	pattern = db.relationship("Pattern", back_populates="projects")
	project_images = db.relationship("ProjectImage", back_populates="project", cascade="all, delete-orphan")
	user = db.relationship("User", back_populates="projects")

	def __repr__(self):
		return f'<Project {self.id}, {self.title}, {self.status}>'
	

class ProjectImage(db.Model):
	__tablename__ = "project_images"

	id = db.Column(db.Integer, primary_key=True)
	cloudinary_public_id = db.Column(db.String, nullable=True)
	secure_url = db.Column(db.String, nullable=False)
	image_type = db.Column(db.String, nullable=False)
	notes = db.Column(db.String, nullable=True)
	created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
	project_id = db.Column(db.Integer, db.ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)

	#nested relationship
	project = db.relationship("Project", back_populates="project_images") 

	@validates('image_type')
	def validate_image_type(self, key, value):
		if value not in allowed_image_types:
			raise ValueError(f"image_type must be one of: {allowed_image_types}")
		return value
						 
	def __repr__(self):
		return f'<ProjectImage {self.id}, {self.secure_url}, {self.image_type}>'
						 
    
						 

class Pattern(db.Model):
	__tablename__ = "patterns"

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, nullable=False)
	brand = db.Column(db.String, nullable=False)
	pattern_number = db.Column(db.String, nullable=True)
	category = db.Column(db.String, nullable=False)
	notes = db.Column(db.String, nullable=True)

	user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))

	#relationship
	projects = db.relationship("Project", back_populates="pattern")
	pattern_requirements = db.relationship("PatternRequirement", back_populates="pattern", cascade="all, delete-orphan")
	user = db.relationship("User", back_populates="patterns")
	
	def __repr__(self):
		return f'<Pattern {self.id}, {self.name}, {self.brand}, {self.pattern_number}, {self.category}, {self.notes}>'
	

class PatternRequirement(db.Model):
	__tablename__ = "pattern_requirements"

	id = db.Column(db.Integer, primary_key=True)
	role = db.Column(db.String, nullable=False)
	material_type = db.Column(db.String, nullable=False)
	quantity = db.Column(db.Numeric(precision=8, scale=2), nullable=False)
	unit = db.Column(db.String, nullable=False)
	size = db.Column(db.String, nullable=False)
	pattern_id = db.Column(db.Integer, db.ForeignKey('patterns.id',ondelete="CASCADE"), nullable=False, index=True)

	#relationship
	pattern = db.relationship("Pattern", back_populates="pattern_requirements")

	def __repr__(self):
		return f'<PatternRequirement {self.id}, {self.role}, {self.material_type}, {self.quantity}, {self.unit}, {self.size}>'

