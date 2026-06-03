import { CalendarDays, PencilLine, PencilRuler, SquarePen } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";
import { fetchProjectById } from "../api/projects";
import { capitalizeWords } from "../utils/formatText";

import ProjectDeadlineField from "../components/projects/detailsFields/ProjectDeadlineField";
import ProjectPatternField from "../components/projects/detailsFields/ProjectPatternField";
import ProjectStatusField from "../components/projects/detailsFields/ProjectStatusField";
import ProjectNotesField from "../components/projects/detailsFields/ProjectNotesField";
import "../styles/ProjectDetails.css"


export default function ProjectDetails() {
	const { projects, deleteProject, updateProject } = useContext(ProjectContext);
	const { id } = useParams();
	const navigate = useNavigate();

	//Project State
	const [ project, setProject ] = useState(null);
	const [ projLoading, setProjLoading ] = useState(true);
	const [ projError, setProjError ] = useState(null);

	//Inline Editing Notes State
	const [ measurementsValue, setMeasurementsValue ] = useState("");
	const [ notesValue, setNotesValue ] = useState("");


	//List Project Details By Id
	useEffect(() => {
		const loadProjectDetails = async() => {
			setProjLoading(true);
			setProjError(null);
			try{
				const data = await fetchProjectById(id);
				setProject(data);
			} catch (error){
				setProjError("Error loading project data");
			} finally{
				setProjLoading(false);
			}
		};
		loadProjectDetails()
	}, [id, projects])

	if (projLoading) return <p>Loading project details...</p>
	if (projError || !project) return <p>Error: {projError || "Project not found"}</p>


	//Handle all field updates
	async function handleFieldUpdates(updates) {
		const updated = await updateProject(project.id, updates)
		setProject(updated); 
	}
		
	//Delete Project
	async function handleDelete() {
		if (!window.confirm("Are you sure you want to delete this project?")) return;
		await deleteProject(project.id);
		navigate("/projects");
	};
	

	return(
		<div className="proj-details">
			<Link to="/projects">Back to All Projects</Link>
			
			<h1>{project.title}</h1>

			<div className="proj-details-info">

				{/* status */}
				<ProjectStatusField project={project} onUpdate={handleFieldUpdates}/>

				{/* deadline */}
				<ProjectDeadlineField project={project} onUpdate={handleFieldUpdates}/>
				
				{/* pattern */}
				<ProjectPatternField project={project} onUpdate={handleFieldUpdates}/>
				
				{/* notes */}
				<ProjectNotesField project={project} onUpdate={handleFieldUpdates}/>

				{/* date created/updated */}
				<p className="proj-card-meta">Created: {project.created_at}</p>
 				{project.updated_at && (
					<p className="proj-card-meta">Updated: {project.updated_at}</p>
				)}

			</div>

			<div>
				<button className="proj-card-btn-remove" onClick={handleDelete}>
					Delete Project
				</button>
			</div>
		</div>
	)
}