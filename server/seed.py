#!/usr/bin/env python3

from app import app
from models import db, Project, Pattern, PatternRequirement, Material, ProjectMaterial

with app.app_context():
	db.drop_all()
	db.create_all()

	print("Clearing old data...")
	ProjectMaterial.query.delete()
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
	db.session.flush()

	#Create Project
	proj1 = Project(
		title = "summer dress",
		status = "cutting",
		notes = "lightweight flowy fabric",
		pattern_id = pat2.id
	)
	proj2 = Project(
		title = "workout shorts",
		status = "sewing",
		notes = "add 2 inches to short length",
		pattern_id = pat1.id
	)
	proj3 = Project(
		title = "makeup bag",
		status = "planning",
		notes = "need to find fabric",
		pattern_id = ""
	)

	db.session.add_all([proj1, proj2, proj3])
	db.session.flush()

	#Create ProjectMaterial
	proj_mat1 = ProjectMaterial(
		project_id=proj1.id,
		material_id=mat3.id,
		notes = "for vacation in september"
	)

	db.session.add_all([proj_mat1])
	db.session.commit()

	print("Database seeded successfully!")



	#RoundHole:
	rh1_hole1 = RoundHole(round_id = r1.id, hole_number = 1, par = 4, score = 4)
	rh1_hole2 = RoundHole(round_id = r1.id, hole_number = 2, par = 4, score= 4 )
	rh1_hole3 = RoundHole(round_id = r1.id, hole_number = 3, par = 5, score = 5)
	rh1_hole4 = RoundHole(round_id = r1.id, hole_number = 4, par = 3, score = 4)
	rh1_hole5 = RoundHole(round_id = r1.id, hole_number = 5, par = 4, score = 4)
	rh1_hole6 = RoundHole(round_id = r1.id, hole_number = 6, par = 5, score = 4)
	rh1_hole7 = RoundHole(round_id = r1.id, hole_number = 7, par = 3, score = 3)
	rh1_hole8 = RoundHole(round_id = r1.id, hole_number = 8, par = 4, score = 4)
	rh1_hole9 = RoundHole(round_id = r1.id, hole_number = 9, par = 4, score = 5)
		# round_id = r1.id, hole_number = 10, par = 4, score = 4,
		# round_id = r1.id, hole_number = 11, par = 4, score = 3,
		# round_id = r1.id, hole_number = 12, par = 4, score = 4,
		# round_id = r1.id, hole_number = 13, par = 5, score = 5,
		# round_id = r1.id, hole_number = 14, par = 3, score = 3,
		# round_id = r1.id, hole_number = 15, par = 4, score = 4,
		# round_id = r1.id, hole_number = 16, par = 4, score = 4,
		# round_id = r1.id, hole_number = 17, par = 3, score = 3,
		# round_id = r1.id, hole_number = 18, par = 5, score = 5) 
		
	rh2_hole1 = RoundHole(round_id = r2.id, hole_number = 1, par = 4, score = 4)	
	rh2_hole2 = RoundHole(round_id = r2.id, hole_number = 2, par = 4, score = 3)	
	rh2_hole3 = RoundHole(round_id = r2.id, hole_number = 3, par = 3, score = 3)	
	rh2_hole4 = RoundHole(round_id = r2.id, hole_number = 4, par = 5, score = 4)
	rh2_hole5 = RoundHole(round_id = r2.id, hole_number = 5, par = 5, score = 5)	
	rh2_hole6 = RoundHole(round_id = r2.id, hole_number = 6, par = 4, score = 3)	
	rh2_hole7 = RoundHole(round_id = r2.id, hole_number = 7, par = 4, score = 3)	
	rh2_hole8 = RoundHole(round_id = r2.id, hole_number = 8, par = 3, score = 4)	
	rh2_hole9 = RoundHole(round_id = r2.id, hole_number = 9, par = 5, score = 4)	
		
				
			
	db.session.add_all([rh1_hole1, rh2])
	db.session.commit()

	#Bryan Shots:
	sr1_h1 = [
		Shot(round_hole_id = rh1_hole1.id, stroke_number= 1, start_distance= 392, unit= 'yd', surface = 'tee', penalty= 0, club= '5 Wood'),
		Shot(round_hole_id = rh1_hole1.id, stroke_number= 2, start_distance= 145, unit= 'yd', surface= 'fairway', penalty= 0, club= 'pitching wedge'),
		Shot(round_hole_id = rh1_hole1.id, stroke_number= 3, start_distance= 30, unit= 'ft', surface= 'green', penalty= 0, club= 'putter'),
		Shot(round_hole_id = rh1_hole1.id, stroke_number= 4, start_distance= 1,	unit= 'ft', surface= 'green', penalty= 0, club= 'putter')
		] 
	
	
	s5 = Shot(round_hole_id = rh1_hole2.id, stroke_number= 1, start_distance= 440, unit= 'ft', surface= 'tee', penalty= 0,club= 'driver', notes= '')
	s6 = Shot(round_hole_id = rh1_hole2.id, stroke_number= 2, start_distance= 142, unit= 'ft', surface= 'fairway', penalty= 0, club= 'gap wedge', notes= '')
	s7 = Shot(round_hole_id = rh1_hole2.id, stroke_number= 3, start_distance= 35,	unit= 'ft', surface= 'green', penalty= 0, club= 'putter', notes= '')
	s8 = Shot(round_hole_id = rh1_hole2.id, stroke_number= 4, start_distance= 4, unit= 'ft', surface= 'green', penalty= 0, club= 'putter', notes= '')

	s5 = Shot(round_hole_id = rh1_hole3.id, stroke_number= 1, start_distance= 440, unit= 'ft', surface= 'tee', penalty= 0,club= 'driver', notes= '')
	s6 = Shot(round_hole_id = rh1_hole3.id, stroke_number= 2, start_distance= 142, unit= 'ft', surface= 'fairway', penalty= 0, club= 'gap wedge', notes= '')
	s7 = Shot(round_hole_id = rh1_hole3.id, stroke_number= 3, start_distance= 35,	unit= 'ft', surface= 'green', penalty= 0, club= 'putter', notes= '')
	s8 = Shot(round_hole_id = rh1_hole3.id, stroke_number= 4, start_distance= 4, unit= 'ft', surface= 'green', penalty= 0, club= 'putter', notes= '')
	
	#Luna Shots
	s9 = Shot(round_hole_id = rh2_hole1.id, stroke_number= 1, start_distance= 392, unit= 'yd', surface= 'tee', penalty= 0, club= '5 Wood',notes = '')
	s10 = Shot(round_hole_id = rh2_hole2.id, stroke_number= 2, start_distance= 145, unit= 'yd', surface= 'fairway', penalty= 0, club= 'pitching wedge', notes= '')
	s11 = Shot(round_hole_id = rh2_hole2.id, stroke_number= 3, start_distance= 30, unit= 'ft', surface= 'green', penalty= 0, club= 'putter', notes = '')
	s12 = Shot(round_hole_id = rh2_hole2.id, stroke_number= 4, start_distance= 1,	unit= 'ft', surface= 'green', penalty= 0, club= 'putter', notes= '')

	db.session.add_all([s1,s2,s3,s4])
	db.session.commit()

	#Challenge:
	ch1 = Challenge(user_id= u3.id, title= "Par 3 Bogey Free", type="bogey", target_number= 0, start_date= date(2025,8,3), end_date= date(2025,8,9), status= 'failed')

	ch2 = Challenge( user_id= u1.id, title= "Make 3 Birdies", type="birdie", target_number= 3, start_date= date(2025,8,3), end_date= date(2025,8,9), status= 'achieved')

	db.session.add_all([ch1,ch2])
	db.session.commit()

	print('⛳Database seeded successfully!')




