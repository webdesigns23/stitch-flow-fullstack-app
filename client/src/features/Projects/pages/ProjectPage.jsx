import { useState } from "react";
import { Link } from "react-router-dom";
import AddProjectForm from "../components/AddProjectForm"
import ProjectGallery from "../components/ProjectGallery"

export default function ProjectPage() {
	const [showProjForm, setShowProjForm] = useState(false);

  return (
	<>
		<h1>Sewing Project Manager</h1>
		<Link to="/completed">View All Completed Projects</Link>
		<br></br>

		<button onClick={() => setShowProjForm(!showProjForm)}>
			{showProjForm ? "Exit Project Form" : "+ Add New Project"}
		</button>

		{showProjForm && <AddProjectForm />}
		<ProjectGallery />
	</>
  )
}
