#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from config import app, db, api
from models import *
from schema import *

#Project Routes
class ProjectIndex(Resource):
    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())
        if "page" not in request.args:
            items = Project.query.filter_by(user_id=user_id).all()
            return [ProjectSchema().dump(p) for p in items], 200
        
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 5, type=int)

        pagination = db.paginate(Project.query, page=page, per_page=per_page, error_out=False)
        projects = pagination.items

        return {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "total_pages": pagination.pages,
            "items": [ProjectSchema().dump(project) for project in projects]
        }, 200
    
    @jwt_required()  
    def post(self):
        user_id = int(get_jwt_identity())
        data = request.get_json() or {}

        #to link pattern to project
        pattern_id = data.get("pattern_id")
        if pattern_id is None:
            return {"error": "Pattern Id required"}, 422
            
        pattern = Pattern.query.filter_by(id=pattern_id, user_id=user_id).first()
        if not pattern:
            return {"error": "Pattern not found or does not belong to you"}, 404
            
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

            new_project = Project(
                user_id = user_id,
                title = title,
                status = status,
                notes = notes,
                pattern = pattern           
            )

            db.session.add(new_project)
            db.session.commit()
            return ProjectSchema().dump(new_project), 201
        
        except ValueError:
            db.session.rollback()  
            return {'error': 'Unable to Process, Incorrect Value'}, 422

        except IntegrityError:
            db.session.rollback()
            return {'error': 'Unable to Process, Data Invalid'}, 422   
       

class ProjectDetails(Resource):
    @jwt_required()
    def get(self, project_id):
        user_id = int(get_jwt_identity())
        project = Project.query.filter_by(user_id=user_id, id=project_id).first()

        # project = Project.query.filter_by(user_id=user_id).get(project_id)

        if not project:
            return {"error": "Project not found"}, 404
        return ProjectSchema().dump(project), 200
        
    @jwt_required()
    def patch(self, project_id):
        user_id = int(get_jwt_identity())
        data = request.get_json() or {}
        
        project = Project.query.filter_by(user_id=user_id, id=project_id).first()
        
        # project = Project.query.filter_by(user_id=user_id, project_id = project_id).first()
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
                project.pattern = None
            else:
                pattern = Pattern.query.get(patternId)
                if not pattern:
                    return {"error": "Pattern not found"}, 422
                project.pattern = pattern
            
        try:
            db.session.commit()
            return ProjectSchema().dump(project), 200
        except IntegrityError:
            db.session.rollback()
            return {"error": "Unable to update project"}, 422 
        
    @jwt_required()
    def delete(self, project_id):
        user_id = int(get_jwt_identity())
        project = Project.query.filter_by(user_id=user_id, id = project_id).first()

        if not project:
            return {"error": "No projects found, add a project"}, 404
        else:
            db.session.delete(project)
            db.session.commit()
            return {}, 204
# API Endpoints
def register_project_resources(api):
    api.add_resource(ProjectIndex, "/projects", endpoint="projects")
    api.add_resource(ProjectDetails, "/projects/<int:project_id>")