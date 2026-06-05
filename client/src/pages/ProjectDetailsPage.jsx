import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { ProjectContext } from "../context/ProjectContext";
import { fetchProjectById } from "../api/projects";
import { capitalizeWords } from "../utils/formatText";

import ProjectDeadlineField from "../components/projects/detailsFields/ProjectDeadlineField";
import ProjectPatternField from "../components/projects/detailsFields/ProjectPatternField";
import ProjectStatusField from "../components/projects/detailsFields/ProjectStatusField";
import ProjectSizeNotesField from "../components/projects/detailsFields/ProjectSizeNotesField";
import ProjectNotesField from "../components/projects/detailsFields/ProjectNotesField";
import ProjectImages from "../components/projects/detailsFields/ProjectImages";
import "../styles/ProjectDetails.css";



export default function ProjectDetails() {
	const { projects, deleteProject, updateProject } = useContext(ProjectContext);
	const { id } = useParams();
	const navigate = useNavigate();

	//Project State
	const [ project, setProject ] = useState(null);
	const [ projLoading, setProjLoading ] = useState(true);
	const [ projError, setProjError ] = useState(null);


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
	}, [id])

	if (projLoading) return <p>Loading project details...</p>
	if (projError || !project) return <p>Error: {projError || "Project not found"}</p>


	//Handle all field updates
	async function handleFieldUpdates(updates) {
		const updated = await updateProject(project.id, updates)
		setProject(updated); 
	};

	//Handle ProjectImages updates
	async function handleImageUpdates(imageUpdates) {
		setProject(prev => ({...prev, project_images: imageUpdates}));
	};
		
	//Delete Project
	async function handleDelete() {
		if (!window.confirm("Are you sure you want to delete this project?")) return;
		await deleteProject(project.id);
		navigate("/projects");
	};
	
	return(
		<>
			<header className="proj-header">
				<Link className="go-back" to="/projects">
					<CircleArrowLeft color="#986f16" />{" "}Back to All Projects
				</Link>

				<button className="proj-card-btn-remove" onClick={handleDelete}>
					Delete Project
				</button>
			</header>

			<main className="proj-details">				
				<h1>{capitalizeWords(project.title)}</h1>

				{/* Top Banner: Status Timeline */}
				<section className="status-banner-card">
					{/* status */}
					<ProjectStatusField project={project} onUpdate={handleFieldUpdates}/>
				</section>

				{/* Grid Area: 3 Columns for Metadata */}
				<div className="meta-info-grid">
					<article className="meta-card deadline-card">
						{/* deadline */}
						<ProjectDeadlineField project={project} onUpdate={handleFieldUpdates}/>

						<hr className="proj-card-divider" />
					
						<footer className="card-dates">
							{/* date created/updated */}
							<p className="proj-card-meta">Created: {project.created_at}</p>
							{project.updated_at && (
							<p className="proj-card-meta">Updated: {project.updated_at}</p>
							)}					
						</footer>
					</article>
					<article className="meta-card pattern-card">
						{/* pattern */}
						<ProjectPatternField project={project} onUpdate={handleFieldUpdates}/>
					</article>
					<article className="meta-card notes-card">
						{/* notes */}
						<ProjectNotesField project={project} onUpdate={handleFieldUpdates}/>
					</article>
				</div>		

				{/* Grid Area: 2 Columns for Size notes and measurement image */}
				<div className="secondary-info-grid">
					<article> 
						{/* size notes */}
						<ProjectSizeNotesField project={project} onUpdate={handleFieldUpdates}/>
					</article>					
				</div>	
				
				{/* Large Bottom Section: Image Gallery */}
				<section className="gallery-section-card">
					<ProjectImages project={project} onImageUpdate={handleImageUpdates} />
				</section>

			</main>
		</>
	)
}