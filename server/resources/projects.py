#!/usr/bin/env python3

from flask import request
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import get_jwt_identity, jwt_required

from config import db
from models import *
from schema import *
from cloudinary_helper import upload_image, delete_image


# Project Routes
class ProjectIndex(Resource):
    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())
        if "page" not in request.args:
            items = Project.query.filter_by(user_id=user_id).all()
            return [ProjectSchema().dump(p) for p in items], 200
        
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 5, type=int)

        pagination = db.paginate(Project.query.filter_by(user_id=user_id), page=page, per_page=per_page, error_out=False)
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

        # To link a pattern to new project, Not Required
        pattern_id = data.get("pattern_id")
        pattern = None
        if pattern_id is not None:
            pattern = Pattern.query.filter_by(id=pattern_id, user_id=user_id).first()
            if not pattern:
                return {"error": "Pattern not found or does not belong to you"}, 404

        # Add new Project    
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
            if len(notes) > 500:
                return {"error": "Notes cannot be more than 500 characters"}, 422
            
            deadline = data.get("deadline") or default_deadline()

            measurement_notes = (data.get("measurement_notes") or "").strip()
            if measurement_notes and len(measurement_notes) > 100:
                return {"error": "Measurement Notes cannot be more than 100 characters"}, 422

            new_project = Project(
                user_id = user_id,
                title = title,
                status = status,
                notes = notes,
                deadline = deadline,
                measurement_notes = measurement_notes,
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

        if not project:
            return {"error": "Project not found"}, 404
        return ProjectSchema().dump(project), 200
        
    @jwt_required()
    def patch(self, project_id):
        user_id = int(get_jwt_identity())
        data = request.get_json() or {}
        
        project = Project.query.filter_by(user_id=user_id, id=project_id).first()

        if not project:
            return {"error": "No projects found, add a project"}, 404
        
        if "title" in data:
            title = data.get("title").strip()
            if len(title) > 35:
                return {"error": "Title cannot be more than 35 characters"}, 422
            project.title = title

        if "status" in data:
            new_status = data.get("status").strip()
            if new_status not in allowed_project_status:
                return {"error": "Invalid status, update to 'planning',  'cutting', 'ready_to_sew', 'sewing', 'final_touches', or 'complete'"}, 422
            project.status = new_status

        if "notes" in data:
            notes = data.get("notes").strip()
            if len(notes) > 500:
                return {"error": "Notes cannot be more than 500 characters"}, 422
            project.notes = notes

        if "deadline" in data: 
            deadline = data.get("deadline")
            if not deadline:
                return {"error": "Deadline is required"}, 422
            project.deadline = deadline

        if "measurement_notes" in data: 
            measurement_notes = (data.get("measurement_notes") or "").strip() or None
            if measurement_notes and len(measurement_notes) > 100:
                return {"error": "Measurement notes cannot be more than 100 characters"}, 422
            project.measurement_notes = measurement_notes

        if "pattern_id" in data:
            patternId = data.get("pattern_id")
            if patternId is None:
                project.pattern = None
            else:
                pattern = db.session.get(Pattern, patternId)
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
        try:
            db.session.delete(project)
            db.session.commit()
            return {}, 204
        except IntegrityError:
            db.session.rollback()
            return {"error": ["Could not delete project"]}, 400
        except Exception:
            db.session.rollback()
            return {"error": ["server error"]}, 500
        

# Project Image Routes, GET all images, POST upload a new image
class ProjectImageIndex(Resource):
    @jwt_required()
    def get(self, project_id):
        user_id = int(get_jwt_identity())
        project = Project.query.filter_by(user_id=user_id, id=project_id).first()

        if not project:
            return {"error": "Project not found."}, 404
        
        return [ProjectImageSchema().dump(image) for image in project.project_images], 200
    
    @jwt_required()
    def post(self, project_id):
        user_id = int(get_jwt_identity())
        project = Project.query.filter_by(user_id=user_id, id=project_id).first()

        if not project:
            return {"error": "Project not found."}, 404
        
        # Validate image_type
        image_type = request.form.get("image_type", "").strip()
        if not image_type:
            return {"error": "Image type is required"}, 422
        if image_type not in allowed_image_types:
            return {"error": f"Image type must be: {allowed_image_types}"}, 422
        
        notes = (request.form.get("notes") or "").strip() or None

        # Get the uploaded file from user
        file = request.files.get("image")
        if not file:
            return {"error": "No image file provided"}, 422
 
        try:
            # Upload image file to Cloudinary
            result = upload_image(file, folder=f"sewing_projects/{user_id}")

            project_image = ProjectImage(
                project_id = project_id,
                secure_url = result["secure_url"],
                cloudinary_public_id = result["cloudinary_public_id"],
                image_type = image_type,
                notes = notes
            )
            
            db.session.add(project_image)
            db.session.commit()
            return ProjectImageSchema().dump(project_image), 201
 
        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 422
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to upload image"}, 500



class ProjectImageDetails(Resource):
    @jwt_required()
    def patch(self, project_id, image_id):
        # update image type or notes on an existing image
        user_id = int(get_jwt_identity())
        project = Project.query.filter_by(user_id=user_id, id=project_id).first()

        if not project:
            return {"error": "Project not found"}, 404
        
        image = ProjectImage.query.filter_by(id=image_id, project_id=project_id).first()

        if not image:
            return {"error": "Image not found"}, 404

        data = request.get_json() or {}
        
        if "image_type" in data:
            image_type =  data.get("image_type", "").strip()
            if image_type not in allowed_image_types:
                return {"error": f"Invalid status, must be one of the following: {allowed_image_types} "}, 422
            image.image_type = image_type
        
        if "notes" in data:
            notes = (data.get("notes") or "").strip() or None
            if notes and len(notes) > 250:
                return {"error": "Notes cannot be more than 250 characters"}, 422
            image.notes = notes

        try:
            db.session.commit()
            return ProjectImageSchema().dump(image), 200
        except Exception:
            db.session.rollback()
            return {"error": "Unable to update image info"}, 500
        
    @jwt_required()
    def delete(self, project_id, image_id):
        # delete a project image
        user_id = int(get_jwt_identity())
        project = Project.query.filter_by(user_id=user_id, id=project_id).first()

        if not project:
            return {"error": "Project not found"}, 404
        
        image = ProjectImage.query.filter_by(id=image_id, project_id=project_id).first()

        if not image:
            return {"error": "Image not found"}, 404
        
        try: 
            # Delete from Cloudinary first
            if image.cloudinary_public_id:   
                delete_image(image.cloudinary_public_id)

            db.session.delete(image)
            db.session.commit()
            return {}, 204
        except Exception as e:
            db.session.rollback()
            return {"error": "Could not delete image"}, 500
               
    
# API Endpoints
def register_project_resources(api):
    api.add_resource(ProjectIndex, "/projects", endpoint="projects")
    api.add_resource(ProjectDetails, "/projects/<int:project_id>", endpoint="project_details")
    api.add_resource(ProjectImageIndex, "/projects/<int:project_id>/images", endpoint="project-images")
    api.add_resource(ProjectImageDetails, "/projects/<int:project_id>/images/<int:image_id>", endpoint="project-images_details")