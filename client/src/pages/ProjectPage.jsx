import { useState } from "react";
import { Link } from "react-router-dom";
import AddProjectForm from "../components/projects/AddProjectForm"
import ProjectGallery from "../components/projects/ProjectGallery"

export default function ProjectPage() {
	const [showProjForm, setShowProjForm] = useState(false);

  return (
	<div className="project-container">
		<h1>Sewing Project's</h1>
		<Link to="/completed">View All Completed Projects</Link>
		<br></br>

		<button
			className="proj-card-btn" 
			onClick={() => setShowProjForm(!showProjForm)}>
			{showProjForm ? "Exit Project Form" : "+ Add New Project"}
		</button>

		{showProjForm && <AddProjectForm />}

		<ProjectGallery />
	</div>
  )
}
