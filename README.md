Sewing Project Manager Full-Stack App
=======

Stay inspired and organized with all your sewing projects in one easy space

# Overview
A sewing project management tracker that helps casual sewists, quilters, and cosplayers turn creative ideas into finished projects. Plan your projects, track your progress, and keep all your pattern specs, materials, costs and notes in one place. Whether you’re starting something new or revisiting a favorite creation, StitchFlow keeps your sewing projects moving smoothly from the first stitch to the final seam so you can spend less time organizing and more time sewing.

# Live Demo
[Visit Stitch Flow](https://stitch-flow-fullstack-app.vercel.app/)

# Features
- User authentication (signup/login) so each user's projects and patterns stay private
- View, add, and delete Projects and Patterns
- Track Project status on a Kanban board, grouped by deadline month, with overdue and due-soon highlighting
- Update Pattern information and link Patterns to Projects (or mark a Project as "no pattern")
- Upload and manage Project photos via Cloudinary, with filterable image galleries and a lightbox viewer
- View all completed Projects in a dedicated gallery
- View a Dashboard with project stats, a pie chart of Projects by status, a bi-weekly schedule view, overdue/due-soon alerts, and a card showing how many planning-status Projects have a linked pattern, with a "View Materials" link to the Materials page

# Tools Featured in this Project:
- [GitHub Repo](https://github.com/webdesigns23/stitch-flow-fullstack-app.git)
- Text Editor or IDE (e.g., VS Code)
- Git + GitHub
- React
- React Router
- Vite
- Node.js
- Python 3.8.13+
- Virtualenv
- Python Packages listed in requirements.txt
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- Flask-Bcrypt
- Flask-CORS
- PostgreSQL (via Neon)
- Cloudinary (image hosting & management)

# Resources
- [React Router](https://reactrouter.com/en/main)
- [Recharts](https://recharts.org/en-US)
- [Cloudinary](https://cloudinary.com/home)

# ERD
![Entity Relationship Diagram](./server/images/project%202%20ERD.png)

# React Router Endpoints
* "/" : Landing Page (if not logged in), about Stitch Flow, Signup, Login 
* "/" : Dashboard Page (if logged in) with stats, pie chart, link to materials page, bi-weekly schedule
* "/materials" : Displays material list of projects in planning status that have a linked pattern
* "/projects" : Projects Gallery, has filtering and add project form, links to projects/id page
* "/projects/:id" : Project details, deadline, pattern link, image gallery, notes, and status
* "/patterns" : Patterns Gallery, has filtering and add patterns form, links to patterns/id page
* "/patterns/:id" : Pattern info and requirments, edit pattern info
* "/completed" : Gallery of Completed Project Cards

# Set Up and Installation:
Fork and clone the GitHub Repo
```bash
git clone <repo_url>
cd <folder name>

```
# Server: Running Application Backend:
1. Set up your virtual environment of choice (virtualenv prefered)
```bash
virtualenv env1
source env1/bin/activate
```
2. Install PyPi dependencies using requiements.txt
```bash
pip install -r requirements.txt
```

3. Navigate into the server/ directory and create a `.env` file with the following variables:
```bash
DATABASE_URL=
JWT_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

4. Set environment variables for running the Flask server locally:
```bash
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
```

5. Create a migrations folder, run initial migration and update
```bash
cd server
flask db init
flask db migrate -m "initial migration"
flask db upgrade
```
6. Populate database with initial data
```bash
python seed.py
```
# Running Back-end of Application:
Should run on port 5555 to match proxy in package.json
You can run the Flask server with:
```bash
python app.py
```

# Client: Running Application Frontend:
To run the React application
Should run on: (http://127.0.0.1:5173/)
1. Open client folder
```bash
cd client
```
2. Install dependencies
```bash
npm install
```
3. Start the application
```bash
npm run dev
```

# API Endpoints and Functionality:

## Auth
`POST /signup`
* Creates a new user account

`POST /login`
* Logs in an existing user and returns a JWT

`GET /me`
* Returns the currently authenticated user's info

## Projects
`GET /projects`
* Returns all Projects for the logged-in user

`POST /projects`
* Adds a new Project

`GET /projects/<id>`
* Returns a single Project by id

`PATCH /projects/<id>`
* Updates a Project (status, deadline, pattern link, notes, etc.)

`DELETE /projects/<id>`
* Deletes a Project

## Project Images
`GET /projects/<id>/images`
* Returns all images for a Project

`POST /projects/<id>/images`
* Uploads a new image to Cloudinary and links it to a Project

`PATCH /projects/<id>/images/<image_id>`
* Updates an image's type or notes

`DELETE /projects/<id>/images/<image_id>`
* Deletes a Project image

## Patterns
`GET /patterns`
* Returns all Patterns

`POST /patterns`
* Adds a new Pattern

`GET /patterns/<id>`
* Returns a single Pattern by id

`PATCH /patterns/<id>`
* Updates Pattern information

`DELETE /patterns/<id>`
* Deletes a Pattern

## Pattern Requirements
`GET /patterns/<id>/requirements`
* Returns all requirements for a Pattern

# Testing: 
- Does not contain test files.
- Use the App for testing.
- Test endpoints in Postman or by using application in browser and inspect

# Application Flow:
1. Sign up or log in to your account
2. View Dashboard too see stats and weekly schedule, if empty then add pattern/projects
3. Add a pattern with all pattern info and pattern requirements
4. Add a project, optionally linking a pattern from the dropdown (or mark it as "No Pattern")
5. Default status is set to "planning"
6. Track progress on the Kanban board, organized by deadline month and status
7. Upload progress photos to your project's image gallery
8. Update status as you work, mark as finished when complete
9. View finished projects in the Completed gallery
10. Delete if you decide you no longer want to work on a project

# Commit and Push Git History if any adjustments to this code are made
1. Add your changes to the staging area by executing
2. Create a commit by executing 
3. Push your commits to GitHub by executing 
4. If you created a separate feature branch, remember to open a PR on main and merge.
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

# Author and Project Context
* Created by: Sharmaine Perea
* Project Created for Flatiron School Software Engineering Bootcamp
* Assignment: Capstone Project 2