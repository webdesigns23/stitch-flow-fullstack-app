#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import *
from schema import *

#Routes
class ProjectIndex(Resource):
    def get(self):
        projects = [ProjectSchema().dump(project) for project in Project.query.all()]
        return projects, 200
    
    def post(self):
        data = request.get_json()
        
        try:
            project = Project(
            title = data.get("title"),
            status = data.get("status") or "planning",
            notes = data.get("notes")            
        )
            db.session.add(project)
            db.session.commit()
            return ProjectSchema.dump(project), 201
        
        except ValueError:
            db.session.rollback()  
            return {'error': 'Unable to Process, Incorrect Value'}, 422

        except IntegrityError:
            db.session.rollback()
            return {'error': 'Unable to Process, Data Invalid'}, 422   
       

class ProjectDetails(Resource):
    def patch(self, id):
        data = request.get_json()
        project = Project.query.filter_by(id = id).first()

        if not project:
            return {"error": "No projects found, add a project"}, 404
        
        if "status" in data:
            new_status = (data.get("status")).strip()
            if new_status not in allowed_project_status:
                return {"error": "Invalid status, update to 'planning', 'ready to sew', 'cutting', 'sewing', 'final touches', or 'complete'"}, 422
            project.status = new_status
            
        try:
            db.session.commit()
            return ProjectSchema.dump(project), 200
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
        

# API Endpoints
api.add_resource(ProjectIndex, "/projects", endpoint="projects")
api.add_resource(ProjectDetails, "/projects/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)