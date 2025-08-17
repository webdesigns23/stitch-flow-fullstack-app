#!/usr/bin/env python3

from app import app
from models import db, Project, Pattern, PatternRequirement, Material, ProjectMaterial

with app.app_context():
	db.drop_all()
	db.create_all()

	print("Clearing old data...")
	ProjectMaterial.query.delete()
	db.session.commit()

	Project.query.delete()
	Pattern.query.delete()
	PatternRequirement.query.delete()
	Material.query.delete()
	db.session.commit()

	print("Seeding new data...")
	#Create Pattern
	pat1 = Pattern(
		name="classic biker short", 
		brand="charms", 
		pattern_number="bkshcd123", 
		category = "clothing", 
		notes = "paper patterns"
	)
	pat2 = Pattern(
		name = "short sleeve tshirt dress",
		brand = "tailornova",
		pattern_number = "tn1001",
		category = "clothing",
		notes = "etsy digital pattern"
	)

	db.session.add_all([pat1, pat2])
	db.session.commit()

	#Create PatternRequirment
	pat_req1= PatternRequirement(
		role = "base fabric",
		material_type = "spandex",
		quantity = .5,
		unit = "yds",
		size = "large",
		pattern_id = 1
		)	
	pat_req2= PatternRequirement(
		role = "exterior fabric",
		material_type = "jersey",
		quantity = 2.5,
		unit = "yds",
		size = "medium",
		pattern_id = 2
		)	
	pat_req3= PatternRequirement(
		role = "trim",
		material_type = "cotton",
		quantity = 1.5,
		unit = "yds",
		size = "medium",
		pattern_id = 2
		)	
	
	db.session.add_all([pat_req1, pat_req2, pat_req3])
	db.session.commit()
	
	#Create Material
	mat1 = Material(
		name = "fusible interfacing",
		material_type = "pellon 809",
		color = "white",
		quantity = 3,
		unit = "yds",
		price = 4.50,
		supplier = "joann fabrics",
		notes = "iron on",
)
	mat2 = Material(
		name = "invisible zipper",
		material_type = "notion",
		color = "white",
		quantity = 1,
		unit = "ea",
		price = 1.25,
		supplier = "hobby lobby",
		notes = "12-14 inch",
	)
	mat3 = Material(
		name = "mushroom print",
		material_type = "jersey",
		color = "multi",
		quantity = 2.5,
		unit = "yds",
		price = 25,
		supplier = "joann fabrics",
		notes = "discontinued fabric",
	)
	mat4 = Material(
		name = "athleisure sportswear",
		material_type = "lycra",
		color = "black",
		quantity = 1,
		unit = "yds",
		price = 12,
		supplier = "sportek",
		notes = "moisture wicking",
	)

	db.session.add_all([mat1, mat2, mat3, mat4])
	db.session.commit()

	#Create Project
	proj1 = Project(
		title = "summer dress",
		status = "cutting",
		notes = "lightweight flowy fabric",
		pattern_id = 2
	)

	db.session.add_all([proj1])
	db.session.commit()

	#Create ProjectMaterial
	proj_mat1 = ProjectMaterial(
		project_id=proj1.id,
		material_id=mat3.id,
		notes = "for vacation in september"
	)

	db.session.add_all([proj_mat1])
	db.session.commit()

	print("Database seeded successfully!")

