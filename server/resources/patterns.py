#!/usr/bin/env python3

from flask import request
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import get_jwt_identity, jwt_required

from config import db
from models import *
from schema import *


#Pattern Routes
class PatternIndex(Resource):
    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())
        patterns = (
            Pattern.query
            .filter_by(user_id=user_id)
            .all())
        return [PatternSchema().dump(p) for p in patterns], 200
    
    @jwt_required()
    def post(self):
        user_id = int(get_jwt_identity())
        data = request.get_json() or {}

        #Validate before creating pattern
        name = (data.get("name") or "").strip()
        brand = (data.get("brand") or "").strip()
        pattern_number = (data.get("pattern_number") or "").strip()
        category = (data.get("category") or "").strip()
        notes = (data.get("notes") or "").strip()

        if not name:
            return {"error": "Name is required"}, 422
        if len(name) > 35:
            return {"error": "Name cannot be more than 35 characters"}, 422
        if not brand:
            return {"error": "Brand is required"}, 422
        if len(brand) > 35:
            return {"error": "Brand cannot be more than 35 characters"}, 422
        if category not in allowed_pattern_category:
            return {"error": "Choose a valid category"}, 422
        if len(notes) > 100:
            return {"error": "Notes cannot be more than 100 characters"}, 422

        reqs = data.get("pattern_requirements") or []
        if len(reqs) > 20:
            return {"error": "Up to 20 requirements per pattern"}, 422
        for r in reqs:
            if not isinstance(r, dict):
                return {"error": "Each requirement must be an object"}, 422
            try:
                quantity = float(r.get("quantity"))
            except (TypeError, ValueError):
                return {"error": "Each requirement needs a numeric quantity"}, 422
            if quantity <= 0:
                return {"error": "Quantity must be more than 0"}, 422

        try:
            #Create new pattern
            new_pattern = Pattern(
                user_id = user_id,
                name = name,
                brand = brand,
                pattern_number = pattern_number or None,
                category = category,
                notes = notes or None,
            )

            db.session.add(new_pattern)
            db.session.flush()

            #Create requirements for pattern
            new_reqs = []
            for r in reqs:
                req = PatternRequirement(
                role = r.get("role"),
                material_type = r.get("material_type"),
                quantity = r.get("quantity"),
                unit = r.get("unit"),
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
            return {"error": str(e)}, 422
        
        except IntegrityError as e:
            db.session.rollback()
            print("IntegrityError details:", e.orig)
            return {"error": "Unable to create pattern, check required fields"}, 422
                   
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

        if "name" in data:
            name = (data.get("name") or "").strip()
            if not name:
                return {"error": "Name is required"}, 422
            if len(name) > 35:
                return {"error": "Name cannot be more than 35 characters"}, 422
            pattern.name = name
        
        if "brand" in data:
            brand = (data.get("brand") or "").strip()
            if not brand:
                return {"error" : "Brand is required"}, 422            
            if len(brand) > 35:
                return {"error": "Brand cannot be more than 35 characters"}, 422
            pattern.brand = brand

        if "pattern_number" in data:
            pattern_number = (data.get("pattern_number") or None).strip()
            if len(pattern_number) > 35:
                return {"error": "Pattern number cannot be more than 35 characters"}, 422
            pattern.pattern_number = pattern_number

        if "notes" in data:
            notes = (data.get("notes") or None).strip()
            if len(notes) > 100:
                return {"error": "Notes cannot be more than 100 characters"}, 422
            pattern.notes = notes
        
        if "category" in data:
            new_category = (data.get("category") or "").strip()
            if new_category not in allowed_pattern_category:
                return {"error": "Invalid category, update to 'clothing', 'accessories', 'quilting', 'home_decor', 'costumes', or 'other'"}, 422
            pattern.category = new_category

        try:
            db.session.commit()
            return PatternSchema().dump(pattern), 200
        except IntegrityError:
            db.session.rollback()
            return {"error": "Unable to update pattern"}, 400
        except Exception:
            db.session.rollback()
            return {"error": "Server error"}, 500
        
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
            return {"error": "Could not delete pattern"}, 400
        except Exception:
            db.session.rollback()
            return {"error": "Server error"}, 500
        
#Pattern Requirments Routes
class PatternRequirementList(Resource):
    @jwt_required()
    def get(self, pattern_id):
        user_id = int(get_jwt_identity())
        pattern = Pattern.query.filter_by(id=pattern_id, user_id=user_id).first()
        if not pattern:
            return {"error": "Pattern not found"}, 404
        req = PatternRequirement.query.filter_by(pattern_id = pattern_id).all()
        return [PatternRequirementSchema().dump(r) for r in req], 200
    
# API Endpoints
def register_pattern_resources(api):
    api.add_resource(PatternIndex, "/patterns", endpoint="patterns")
    api.add_resource(PatternDetails, "/patterns/<int:pattern_id>")
    api.add_resource(PatternRequirementList, "/patterns/<int:pattern_id>/requirements")