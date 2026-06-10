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
					onClick={() => setShowProjForm(true)}>
						+ Add New Project
				</button>
		</header>

		<h1>Sewing Projects</h1>

		{/* Add Project Modal */}
		{showProjForm && (
			<div className="modal-overlay"
				onClick={() => setShowProjForm(false)}>
					<div className="modal-content"
						onClick={(e) => e.stopPropagation()}>
						<AddProjectForm onClose={() => setShowProjForm(false)}/>
					</div>
			</div>
		)}

		{loading && <p>Loading...</p>}
		{error && <p>Error: {error}</p>}

		{/* Kanban Projects Display */}
		{!loading && !error && (
			<ProjectKanban projects={projects}/>
		)}
	</div>
  )
}
