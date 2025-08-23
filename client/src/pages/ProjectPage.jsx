import { useState } from "react";
import ProjectGallery from "../components/ProjectsFeature/ProjectGallery"
import AddProjectForm from "../components/ProjectsFeature/AddProjectForm"

export default function ProjectPage() {
	const [showProjForm, setShowProjForm] = useState(false);

  return (
	<>
		<h1>Sewing Project Manager</h1>

		<button onClick={() => setShowProjForm(!showProjForm)}>
			{showProjForm ? "Exit Project Form" : "+ Add New Project"}
		</button>

		{showProjForm && <AddProjectForm />}
		<ProjectGallery />
	</>
  )
}
