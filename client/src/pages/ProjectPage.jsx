import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddProjectForm from "../components/projects/AddProjectForm"
import ProjectKanban from "../components/projects/ProjectKanban";
import { ProjectContext } from "../context/ProjectContext";

export default function ProjectPage() {
	const [showProjForm, setShowProjForm] = useState(false);

	const { projects, loading, error } = useContext(ProjectContext);

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

		{loading && <p>Loading...</p>}
		{error && <p>Error: {error}</p>}

		{!loading && !error && (
			<ProjectKanban projects={projects}/>
		)}
	</div>
  )
}
