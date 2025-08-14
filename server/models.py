from config import db

#Models
class Project(db.Model):
	__tablename__ = "projects"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.string, nullable=False)
	status = db.Column(db.string, default="planning")
	notes = db.Column(db.text, nullable=True)
	date_created = db.Column(db.Date, nullable=False)
	date_updated = db.Column(db.Date, nullable=False)
	
	pattern_id = db.Column(db.Integer, db.ForeignKey('pattern.id'))
	pattern = db.relationship("Pattern", back_poplulates="projects")

	def __repr__(self):
		return f'<Project {self.id}, {self.pattern_id}, {self.title}, {self.status}, {self.notes}, {self.date_created}, {self.date_updated}>'

class Pattern(db.Model):
	__tablename__ = "projects"

	def __repr__(self):
		return f'<Project {self.id}>'


class PatternRequirement(db.Model):
	__tablename__ = "projects"

	def __repr__(self):
		return f'<Project {self.id}>'


class Material(db.Model):
	__tablename__ = "projects"

	def __repr__(self):
		return f'<Project {self.id}>'


class ProjectMaterial(db.Model):
	__tablename__ = "projects"

	def __repr__(self):
		return f'<Project {self.id}>'
