#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import *
from schema import *

#Project Routes
class ProjectIndex(Resource):
    def get(self):
        projects = [ProjectSchema().dump(project) for project in Project.query.all()]
        return projects, 200
    
    def post(self):
        data = request.get_json() or {}

        #to link pattern to project
        patternId = data.get("pattern_id")
        if patternId is None:
            return {"error": "Pattern Id required"}, 422
            
        pattern = Pattern.query.get(patternId)
        if not pattern:
            return {"error": "Pattern not found"}, 404
            
        try:
            title = (data.get("title") or "").strip()
            if not title:
                return {"error": "Title is required"}, 422
            if len(title) > 35:
                return {"error": "Title cannot be more than 35 characters"}, 422

            status = (data.get("status") or "planning").strip()
            if status not in allowed_project_status:
                return {"error": "Invalid status, update to 'planning', 'ready_to_sew', 'cutting', 'sewing', 'final_touches', or 'complete'"}, 422

            notes = (data.get("notes") or "").strip()
            if len(notes) > 100:
                return {"error": "Notes cannot be more than 100 characters"}, 422

            project = Project(
                title = data.get("title"),
                status = data.get("status") or "planning",
                notes = data.get("notes"),
                pattern = pattern           
            )

            db.session.add(project)
            db.session.commit()
            return ProjectSchema().dump(project), 201
        
        except ValueError:
            db.session.rollback()  
            return {'error': 'Unable to Process, Incorrect Value'}, 422

        except IntegrityError:
            db.session.rollback()
            return {'error': 'Unable to Process, Data Invalid'}, 422   
       

class ProjectDetails(Resource):
    def get(self,id):
        project = Project.query.get(id)
        if not project:
            return {"error": "Project not found"}, 404
        return ProjectSchema().dump(project), 200
        

    def patch(self, id):
        data = request.get_json() or {}
        project = Project.query.filter_by(id = id).first()
        if not project:
            return {"error": "No projects found, add a project"}, 404
        
        if "title" in data:
            title = (data.get("title")).strip()
            if len(title) > 35:
                return {"error": "Title cannot be more than 35 characters"}, 422
            project.title = title

        if "notes" in data:
            notes = (data.get("notes")).strip()
            if len(notes) > 100:
                return {"error": "Notes cannot be more than 100 characters"}, 422
            project.notes = notes
        
        if "status" in data:
            new_status = (data.get("status")).strip()
            if new_status not in allowed_project_status:
                return {"error": "Invalid status, update to 'planning', 'ready_to_sew', 'cutting', 'sewing', 'final_touches', or 'complete'"}, 422
            project.status = new_status

        if "pattern_id" in data:
            patternId = data.get("pattern_id")
            if patternId is None:
                return {"error": "Project must have a pattern"}, 422
            pattern = Pattern.query.get(patternId)

            if not pattern:
                return {"error": "Pattern not found"}, 404
            project.pattern = pattern
            
        try:
            db.session.commit()
            return ProjectSchema().dump(project), 200
        except IntegrityError:
            db.session.rollback()
            return {"error": "Unable to update project"}, 422 
        

    def delete(self, id):
        project = Project.query.filter_by(id = id).first()

        if not project:
            return {"error": "No projects found, add a project"}, 404
        else:
            db.session.delete(project)
            db.session.commit()
            return {}, 204
        

#Pattern Routes
class PatternIndex(Resource):
    def get(self):
        patterns = [PatternSchema().dump(p) for p in Pattern.query.all()]
        return patterns, 200
    
    def post(self):
        data = request.get_json() or {}

        try:
            #To create pattern
            pattern = Pattern(
                name = data.get("name"),
	            brand = data.get("brand"),
	            pattern_number = data.get("pattern_number"),
	            category = data.get("category"),
	            notes = data.get("notes"),
            )
            db.session.add(pattern)
            db.session.flush()

            #To create requirements for pattern
            reqs = data.get("pattern_requirements", [])
            new_reqs = []
            for r in reqs:
                req = PatternRequirement(
                role = r.get("role"),
	            material_type = r.get("material_type"),
	            quantity = r.get("quantity"),
	            unit = 	r.get("unit"),
	            size = r.get("size"),
                pattern_id = pattern.id,
            )
                new_reqs.append(req)
                
            if new_reqs:
                db.session.add_all(new_reqs)
            
            db.session.commit()
            return PatternSchema().dump(pattern), 201
        
        except ValueError:
            db.session.rollback()
            return {"error": "Unable to Process, Incorrect Value"}, 422
        
        except IntegrityError:
            db.session.rollback()
            return {"error": "Unable to Process, Data Invalid"}, 422
        
class PatternDetails(Resource):
    def get(self, id):
        pattern = Pattern.query.filter_by(id = id).first()
        if not pattern:
            return {"error": "Pattern not found"}, 404
        return PatternSchema().dump(pattern), 200   
     
    def patch(self, id):
        data = request.get_json() or {}
        pattern = Pattern.query.filter_by(id = id).first()
        if not pattern:
            return {"error": "No patterm found, add a pattern"}, 404
        
        if "brand" in data:
            brand = (data.get("brand")).strip()
            if len(brand) > 35:
                return {"error": "Brand cannot be more than 35 characters"}, 422
            pattern.brand = brand

        if "notes" in data:
            notes = (data.get("notes")).strip()
            if len(notes) > 100:
                return {"error": "Notes cannot be more than 100 characters"}, 422
            pattern.notes = notes
        
        if "category" in data:
            new_category = (data.get("category")).strip()
            if new_category not in allowed_pattern_category:
                return {"error": "Invalid status, update to 'clothing', 'accessories', 'quilting', 'home_decor', 'costumes', or 'other'"}, 422
            pattern.category = new_category

        try:
            db.session.commit()
            return PatternSchema().dump(pattern), 200
        except IntegrityError:
            db.session.rollback()
            return {"error": "Unable to update pattern"}, 422 

    def delete(self, id):
        pattern = Pattern.query.filter_by(id = id).first()

        if not pattern:
            return {"error": "No patterns found, add a pattern"}, 404
        else:
            db.session.delete(pattern)
            db.session.commit()
            return {}, 204
        
#Pattern Requirments Routes
class PatternRequirementList(Resource):
    def get(self, pattern_id):
        pattern = Pattern.query.get(pattern_id)
        if not pattern:
            return {"error": "Pattern not found"}, 404
        req = PatternRequirement.query.filter_by(pattern_id = pattern_id).all()
        return [PatternRequirementSchema().dump(r) for r in req], 200
    

# API Endpoints
api.add_resource(ProjectIndex, "/projects", endpoint="projects")
api.add_resource(ProjectDetails, "/projects/<int:id>")
api.add_resource(PatternIndex, "/patterns", endpoint="patterns")
api.add_resource(PatternDetails, "/patterns/<int:id>")
api.add_resource(PatternRequirementList, "/patterns/<int:pattern_id>/requirements")

if __name__ == '__main__':
    app.run(port=5555, debug=True)