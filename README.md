Sewing Project Manager Full-Stack App
=======

Stay inspired and organized with all your sewing projects in one easy space

# Overview
Stitch Flow is a full-stack project manager for sewists, from hobbyists to small custom apparel businesses. Plan projects, track progress on a Kanban board, and keep pattern specs, materials, photos, and notes together, from the first stitch to the final seam.

It also answers the question every custom maker struggles with in a busy season: can I take on another order? The Production Planner schedules every piece of work by deadline at a steady weekly pace, shows what to sew each week, and flags when you're at capacity or should hold off on new orders.

Stitch Flow started as my capstone project and grew out of my own custom dancewear business, Charms Dancewear, to help manage custom orders.

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

- User authentication (signup and login) so each user's projects and patterns stay private
- Guest demo login for exploring the app with sample data
- Add, view, edit, and delete Projects and Patterns
- Kanban board grouped by deadline month and sorted soonest first, with overdue and due-soon highlighting
- Project quantity, for orders with more than one piece (team costumes, bulk orders)
- Link Patterns to Projects, or mark a Project as having no pattern
- Upload and manage Project photos via Cloudinary, with filterable image galleries and a lightbox viewer
- Completed Projects gallery, grouped by year, showing finished photos and how many days each project took
- Dashboard with today's focus, project stats, weeks of work booked, a pie chart of - Projects by status, and a materials summary
- Production Planner that automatically schedules work and flags capacity (see below)

# Tools Featured in this Project:
- [GitHub Repo](https://github.com/webdesigns23/stitch-flow-fullstack-app.git)
- Text Editor or IDE (e.g., VS Code)
- Git + GitHub
- React, React Router
- Vite
- Node.js
- Python 3.12
- Virtualenv
- Python Packages listed in requirements.txt
- Flask, Flask-RESTful
- Flask-SQLAlchemy
- Flask-Migrate (Alembic)
- Flask-JWT-Extended, Flask-Bcrypt
- Flask-CORS
- Marshmallow
- PostgreSQL (via Neon)
- Cloudinary (image hosting & management)
- Depolyed on Vercel (client) and Render (server)

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
cd server
python -m venv venv
source venv/bin/activate
```
2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Create a .env file in server/:
```bash
DATABASE_URL=
JWT_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

4. Apply the database migrations(the migrations/ folder is included, so there's no need to run flask db init):
```bash
flask --app app db upgrade
```
5. Optional, for a new local database only: load seed data
```bash
python seed.py
```

6. Start the server (runs on port 5555):
```bash
python app.py
```

# Client: Running Application Frontend:
1. In a second terminal, install dependencies:
```bash
cd client
npm install
```
2. Create a .env file in client/ pointing to the server:
```bash
VITE_API_URL=http://127.0.0.1:5555
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
1. Sign up, log in
2. Check the Dashboard for today's focus, weeks of work booked, and this week's Production Plan
3. Add a pattern with its info and material requirements
4. Add a project with a deadline and quantity, optionally linking a pattern
5. New projects start in "planning" status
6. Track progress on the Kanban board, organized by deadline month and status
7. Upload progress photos to the project's image gallery
8. Update the status as you work, and mark it complete when finished
9. View finished projects in the Completed gallery
10. Use the Production Planner flag befoer taking on new orders

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
* Assignment: Capstone Project 2 and expanded since