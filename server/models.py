from sqlalchemy.sql import func
from sqlalchemy.orm import validates
from config import db

#Models
class Project(db.Model):
	__tablename__ = "projects"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String, nullable=False)
	status = db.Column(db.String, default="planning", nullable=False)
	notes = db.Column(db.String, nullable=True)
	created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
	updated_at = db.Column(db.DateTime, onupdate=func.now())
	pattern_id = db.Column(db.Integer, db.ForeignKey('patterns.id'), nullable=True, index=True)
	
	#relationship
	pattern = db.relationship("Pattern", back_populates="projects")
	project_materials = db.relationship("ProjectMaterial", back_populates="project", cascade="all, delete-orphan")

	def __repr__(self):
		return f'<Project {self.id}, {self.title}, {self.status}, {self.notes}>'

class Pattern(db.Model):
	__tablename__ = "patterns"

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, nullable=False)
	brand = db.Column(db.String, nullable=False)
	pattern_number = db.Column(db.String, nullable=True)
	category = db.Column(db.String, nullable=False)
	notes = db.Column(db.String, nullable=True)

	#relationship
	projects = db.relationship("Project", back_populates="pattern")
	pattern_requirements = db.relationship("PatternRequirement", back_populates="pattern", cascade="all, delete-orphan")
	
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
	pattern_id = db.Column(db.Integer, db.ForeignKey('patterns.id'), ondelete="CASCADE", nullable=False, index=True)

	#relationship
	pattern = db.relationship("Pattern", back_populates="pattern_requirements")

	def __repr__(self):
		return f'<PatternRequirement {self.id}, {self.role}, {self.material_type}, {self.quantity}, {self.unit}, {self.size}>'

class Material(db.Model):
	__tablename__ = "materials"

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, nullable=False)
	material_type = db.Column(db.String, nullable=False)
	color = db.Column(db.String, nullable=True)
	quantity = db.Column(db.Numeric(precision=8, scale=2), nullable=False)
	unit = db.Column(db.String, nullable=False)
	price = db.Column(db.Numeric(precision=8, scale=2), nullable=True)
	supplier = db.Column(db.String, nullable=True)
	notes = db.Column(db.String, nullable=True)

	#relationship
	project_materials = db.relationship("ProjectMaterial", back_populates="material")

	def __repr__(self):
		return f'<Material {self.id}, {self.name}, {self.material_type}, {self.color}, {self.quantity}, {self.unit}, {self.price}, {self.supplier}, {self.notes}>'

class ProjectMaterial(db.Model):
	__tablename__ = "project_materials"

	id = db.Column(db.Integer, primary_key=True)
	project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False, index=True)
	material_id = db.Column(db.Integer, db.ForeignKey("materials.id"), nullable=True, index=True)

	name = db.Column(db.String)
	role = db.Column(db.String)
	material_type = db.Column(db.String)
	quantity = db.Column(db.Numeric(precision=8, scale=2))
	unit = db.Column(db.String)
	notes = db.Column(db.String, nullable=True)

	#relationship
	project = db.relationship("Project", back_populates="project_materials")
	material = db.relationship("Material", back_populates="project_materials")

	def __repr__(self):
		return f'<ProjectMaterial {self.id}, {self.name}, {self.role}, {self.material_type}, {self.quantity}, {self.unit}, {self.notes}>'
