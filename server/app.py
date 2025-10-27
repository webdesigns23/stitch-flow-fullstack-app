#!/usr/bin/env python3
from config import app, db, api, jwt, migrate


#Register Resources
from resources.auth import register_auth_resources
from resources.projects import register_project_resources
from resources.patterns import register_pattern_resources

register_auth_resources(api)
register_project_resources(api)
register_pattern_resources(api)

if __name__ == '__main__':
    app.run(port=5555, debug=True)