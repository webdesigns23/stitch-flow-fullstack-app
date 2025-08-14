from config import db

#Models
class Project(db.Model):
	__tablename__ = "projects"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String, nullable=False)
	status = db.Column(db.String, default="planning")
	notes = db.Column(db.Text, nullable=True)
	date_created = db.Column(db.Date, nullable=False)
	date_updated = db.Column(db.Date, nullable=False)
	
	pattern_id = db.Column(db.Integer, db.ForeignKey('patterns.id'))
	pattern = db.relationship("Pattern", back_populates="projects")

	def __repr__(self):
		return f'<Project {self.id}, {self.pattern_id}, {self.title}, {self.status}, {self.notes}, {self.date_created}, {self.date_updated}>'

class Pattern(db.Model):
	__tablename__ = "patterns"

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, nullable=False)
	brand = db.Column(db.String, nullable=False)
	pattern_number = db.Column(db.String, nullable=True)
	category = db.Column(db.String, nullable=False)
	notes = db.Column(db.Text, nullable=True)
	
	def __repr__(self):
		return f'<Pattern {self.id}, {self.name}, {self.brand}, {self.pattern_number}, {self.category}, {self.notes}>'

class PatternRequirement(db.Model):
	__tablename__ = "pattern_requirements"

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, nullable=False)
	brand = db.Column(db.String, nullable=False)
	pattern_number = db.Column(db.string, nullable=True)
	category = db.Column(db.String, nullable=False)
	notes = db.Column(db.Text, nullable=True)

	pattern_id = db.Column(db.Integer, db.ForeignKey('patterns.id'))
	pattern = db.relationship("Pattern", back_populates="pattern_requirements")

	def __repr__(self):
		return f'<PatternRequirement {self.id}, {self.name}, {self.brand}, {self.pattern_number}, {self.category}, {self.notes}>'

class Material(db.Model):
	__tablename__ = "projects"

	def __repr__(self):
		return f'<Project {self.id}>'


class ProjectMaterial(db.Model):
	__tablename__ = "projects"

	def __repr__(self):
		return f'<Project {self.id}>'
