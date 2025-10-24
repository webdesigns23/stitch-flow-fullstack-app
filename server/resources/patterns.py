#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from config import app, db, api
from models import *
from schema import *


#Pattern Routes
class PatternIndex(Resource):
    @jwt_required()
    #Pagination:
    def get(self):
        user_id = int(get_jwt_identity())
        if "page" not in request.args:
            items = Pattern.query.filter_by(user_id=user_id).all()
            return [PatternSchema().dump(p) for p in items], 200
        
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 5, type=int)

        pagination = db.paginate(Pattern.query, page=page, per_page=per_page, error_out=False)
        patterns = pagination.items

        return {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "total_pages": pagination.pages,
            "items": [PatternSchema().dump(p) for p in patterns]
        }, 200

    @jwt_required()
    def post(self):
        user_id = int(get_jwt_identity())
        data = request.get_json() or {}

        try:
            #Create new pattern
            new_pattern = Pattern(
                user_id = user_id,
                name = data.get("name"),
	            brand = data.get("brand"),
	            pattern_number = data.get("pattern_number"),
	            category = data.get("category"),
	            notes = data.get("notes"),
            )

            db.session.add(new_pattern)
            db.session.flush()

            #Create requirements for pattern
            reqs = data.get("pattern_requirements", [])
            new_reqs = []
            for r in reqs:
                req = PatternRequirement(
                role = r.get("role"),
	            material_type = r.get("material_type"),
	            quantity = r.get("quantity"),
	            unit = 	r.get("unit"),
	            size = r.get("size"),
                pattern_id = new_pattern.id,
            )
                new_reqs.append(req)
                
            if new_reqs:
                db.session.add_all(new_reqs)
            
            db.session.commit()
            return PatternSchema().dump(new_pattern), 201
        
        except ValueError as e:
            db.session.rollback()
            print("ValueError details:", e.orig)
            return {"error": str(e.orig)}, 422
        
        except IntegrityError as e:
            db.session.rollback()
            print("IntegrityError details:", e.orig)
            return {"error": str(e.orig)}, 422
            # return {"error": "Unable to Process, Data Invalid"}, 422
        
class PatternDetails(Resource):
    @jwt_required()
    def get(self, pattern_id):
        user_id = int(get_jwt_identity())
        pattern = Pattern.query.filter_by(id = pattern_id, user_id=user_id).first()
        if not pattern:
            return {"error": "Pattern not found"}, 404
        return PatternSchema().dump(pattern), 200   
     
    @jwt_required() 
    def patch(self, pattern_id):
        user_id = int(get_jwt_identity())
        pattern = Pattern.query.filter_by(id = pattern_id, user_id=user_id).first()
        if not pattern:
            return {"error": "No pattern found, add a pattern"}, 404
        
        data = request.get_json() or {} 

        try:
            if "name" in data:
                name = (data.get("name")).strip()
                if len(name) > 35:
                    return {"error": "Name cannot be more than 35 characters"}, 422
                pattern.name = name
            
            if "brand" in data:
                brand = (data.get("brand")).strip()
                if len(brand) > 35:
                    return {"error": "Brand cannot be more than 35 characters"}, 422
                pattern.brand = brand

            if "pattern_number" in data:
                pattern_number = (data.get("pattern_number")).strip()
                if len(pattern_number) > 35:
                    return {"error": "Pattern number cannot be more than 35 characters"}, 422
                pattern.pattern_number = pattern_number

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

                db.session.commit()
                return PatternSchema().dump(pattern), 200
        except IntegrityError:
            db.session.rollback()
            return {"error": ["Unable to update pattern"]}, 400
        except Exception as error:
            db.session.rollback()
            return {'error': ['Server error']}, 500
        
    @jwt_required()
    def delete(self, pattern_id):
        user_id = int(get_jwt_identity())
        pattern = Pattern.query.filter_by(id = pattern_id, user_id=user_id).first()

        if not pattern:
            return {"error": "No patterns found, add a pattern"}, 404
        try:
            db.session.delete(pattern)
            db.session.commit()
            return {}, 204
        except IntegrityError:
            db.session.rollback()
            return {'error': ['Could not delete pattern']}, 400
        except Exception as error:
            db.session.rollback()
            return {'error': ['Server error']}, 500
        
#Pattern Requirments Routes
class PatternRequirementList(Resource):
    @jwt_required()
    def get(self, pattern_id):
        pattern = Pattern.query.get(pattern_id)
        if not pattern:
            return {"error": "Pattern not found"}, 404
        req = PatternRequirement.query.filter_by(pattern_id = pattern_id).all()
        return [PatternRequirementSchema().dump(r) for r in req], 200
    
# API Endpoints
def register_pattern_resources(api):
    api.add_resource(PatternIndex, "/patterns", endpoint="patterns")
    api.add_resource(PatternDetails, "/patterns/<int:id>")
    api.add_resource(PatternRequirementList, "/patterns/<int:pattern_id>/requirements")