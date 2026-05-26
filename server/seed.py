#!/usr/bin/env python3
from config import app, db
from models import User, Project, Pattern, PatternRequirement

with app.app_context():
	db.drop_all()
	db.create_all()

	print("Clearing old data...")
	Project.query.delete()
	Pattern.query.delete()
	PatternRequirement.query.delete()
	User.query.delete()
	db.session.commit()

	# Create USERS: unique username, pw hashed before stored!
	print('Creating Users...')
	u1 = User(username = 'luna', display_name='looneyluna') 
	u1.password_hash = 'kitten123'

	u2 = User(username = 'guest', display_name='jane doe')
	u2.password_hash = 'pw123'

	db.session.add_all([u1,u2])
	db.session.commit()

	print("Seeding new data...")
	#Create Pattern
	pat1 = Pattern(
		user_id = u1.id,
		name="classic biker short", 
		brand="charms", 
		pattern_number="bkshcd123", 
		category = "clothing", 
		notes = "paper patterns"
	)
	pat2 = Pattern(
		user_id = u2.id,
		name = "short sleeve tshirt dress",
		brand = "tailornova",
		pattern_number = "tn1001",
		category = "clothing",
		notes = "etsy digital pattern"
	)

	db.session.add_all([pat1, pat2])
	db.session.flush()

	#Create PatternRequirment
	pat_req1= PatternRequirement(
		role = "base fabric",
		material_type = "spandex",
		quantity = .5,
		unit = "yds",
		size = "medium",
		pattern_id = pat1.id
		)	
	pat_req2= PatternRequirement(
		role = "exterior fabric",
		material_type = "jersey",
		quantity = 2.5,
		unit = "yds",
		size = "medium",
		pattern_id = pat2.id
		)	
	pat_req3= PatternRequirement(
		role = "trim",
		material_type = "cotton",
		quantity = 1.5,
		unit = "yds",
		size = "medium",
		pattern_id = pat2.id
		)	
	
	db.session.add_all([pat_req1, pat_req2, pat_req3])
		

	#Create Project
	proj1 = Project(
		user_id = u1.id,
		title = "summer dress",
		status = "cutting",
		notes = "lightweight flowy fabric",
		pattern_id = pat2.id
	)
	proj2 = Project(
		user_id = u1.id,
		title = "workout shorts",
		status = "sewing",
		notes = "add 2 inches to short length",
		pattern_id = pat1.id
	)
	proj3 = Project(
		user_id = u2.id,
		title = "makeup bag",
		status = "planning",
		notes = "need to find fabric",
		pattern_id = None
	)

	db.session.add_all([proj1, proj2, proj3])
	db.session.flush()
	db.session.commit()

	print("Database seeded successfully!")




