Sewing Project Manager Full-Stack App
=======

Stay inspired and organized with all your sewing projects in one easy space

# Overview
A sewing project management tracker that helps casual sewists, quilters, and cosplayers turn creative ideas into finished projects. Plan your projects, track your progress, and keep all your pattern specs, materials, costs and notes in one place. Whether you’re starting something new or revisiting a favorite creation, StitchFlow keeps your sewing projects moving smoothly from the first stitch to the final seam so you can spend less time organizing and more time sewing.

# Features
- Users can view Projects and Patterns
- Add Projects and Patterns
- Delete Projects and Patterns
- Update status of Projects
- Update Pattern Information
- Connect Patterns to Projects
- View all completed Projects
- View a Dashboad that gives an overview of how many projects and patterns they have as well as a pie chart that shows how many projects are at a certain status.

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
- SQLAlchemy
- SQLite for development
- Vite

# Resources
- [React Router](https://reactrouter.com/en/main)
- [Recharts](https://recharts.org/en-US)

# React Router Endpoints
* "/" : Home Page, about Stitch Flow
* "/dashboard" : Dashboard Page with stats and pie chart of projects by status
* "/projects" : Projects Gallery, has filtering and add project form
* "/patterns" : Patterns Gallery, has add patterns form, links to patterns/id page
* "/patterns/:id" : Pattern info and requirments, edit pattern info
* "/materials" : Feature thats coming soon, lets users know what to look forward to
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
3. Navigate into the server/ directory and set environment variables:
```bash
cd server
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
```
4. Create a migrations folder, run initial migration and update
```bash
cd server
flask db init
flask db migrate -m "initial migration"
flask db upgrade
```
5. Populate database with initial data
```bash
python seed.py
```
# Running Back-end of Application:
6. Should run on port 5555 to match proxy in package.json
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
`/projects`
`/projects/<id>`
`/patterns`
`/patterns/<id>`
`/patterns/<pattern_id>/requirements`

## Project and Pattern Index Class:
`GET /projects or /patterns – paginated`
* Returns all Projects and Patterns
Includes Pagination if called:
* Uses page and per_page query parameters
* Returns only the requested chunk of data
* Includes metadata like the total number of pages

`POST /projects and /patterns`
* Adds a New Project or Pattern

## Project Deatails and Pattern Details Class:
`GET /projects/<id> or /patterns/<id>`
*Returns all projects or patterns by id

`PATCH /projects/<id> or /patterns/<id>`
* Search by id
* Update a status for projects
* Update pattern information

`DELETE /cellar_record/<id>`
* Delete a a project or pattern

## Pattern Requirements List Class:
`GET /patterns/<pattern_id>/requirements`
*Returns all pattern requirments for a patterns by id

# Testing: 
- Does not contain test files.
- Use the App for testing.
- Test endpoints in Postman or by using application in browser and inspect

# Application Flow:
1. Add a pattern with all pattern info and pattern requirements
2. Add a project with pattern, choose from pattern dropdown to link to project
3. Default status is set to "planning"
4. Update status as you work on your project
5. Delete if you decide you no longer want to work on project

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