import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import AddProjectForm from "../components/projects/AddProjectForm"
import ProjectKanban from "../components/projects/ProjectKanban";
import { ProjectContext } from "../context/ProjectContext";

export default function ProjectPage() {
	const [showProjForm, setShowProjForm] = useState(false);

	const { projects, loading, error } = useContext(ProjectContext);

  return (
	<div className="project-container">

		<header className="proj-header">
				<Link className="go-back" to="/completed">
					<CircleArrowLeft color="#986f16" />
					{" "}View All Completed Projects
				</Link>

				<button
					className="proj-card-btn" 
					onClick={() => setShowProjForm(!showProjForm)}>
					{showProjForm ? "Exit Project Form" : "+ Add New Project"}
				</button>
		</header>

		<h1>Sewing Project's</h1>
		
		<br></br>

		{showProjForm && <AddProjectForm />}

		{loading && <p>Loading...</p>}
		{error && <p>Error: {error}</p>}

		{!loading && !error && (
			<ProjectKanban projects={projects}/>
		)}
	</div>
  )
}
