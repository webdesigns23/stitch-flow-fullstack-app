import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PatternContext } from "../../context/PatternContext";
import { ProjectContext } from "../../context/ProjectContext";
import { fetchProjectById } from "../../api/projects";
import { capitalizeWords } from "../../utils/formatText";


const statuses = [
	"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"
];

export default function ProjectDetails() {
	const { patterns, loading: patternLoading } = useContext(PatternContext);
	const { projects, deleteProject, updateProject } = useContext(ProjectContext);
	const { id } = useParams();
	const navigate = useNavigate();

	const [ project, setProject ] = useState(null);
	const [ projLoading, setProjLoading ] = useState(true);
	const [ projError, setProjError ] = useState(null);
	const [ editing, setEditing ] = useState(false);
	const [ editForm, setEditForm ] = useState({});	
	
	//List Project Details By Id
	useEffect(() => {
		const loadProjectDetails = async() => {
			setProjLoading(true);
			setProjError(null);
			try{
				const data = await fetchProjectById(id);
				setProject(data);
				setEditForm({
					title: data.title || "",
					status: data.status || "planning",
					measurement_notes: data.measurement_notes || "",
					deadline: data.deadline || "",
					notes: data.notes || "",
					pattern_id: data.pattern?.id ?? "",
				});
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

	//Pattern List
	const p = project?.pattern;
	const patternId = p?.id ?? project?.pattern_id;
	
	//Delete Project
	async function handleDelete() {
		if (!window.confirm("Are you sure you want to delete this project?")) return;
		await deleteProject(project.id);
		navigate("/projects");
	};


	// const [ showChangePat, setShowChangePat ] = useState(false);

	// async function handleStatusChange(e) {
	// 	const newStatus = e.target.value;
	// 	await updateProject({status: newStatus});
	// }

	// async function handlePatternChange(e) {
	// 	const newPattern = e.target.value ? Number(e.target.value) : null;
	// 	await updateProject({pattern_id: newPattern});
	// }

	return(
		<div className="proj-details">
			<Link to="/projects">Back to All Projects</Link>
			
			<h1>{project.title}</h1>
			<div>
 				<button className="proj-card-btn-remove" onClick={handleDelete}>
 					Delete Project
 				</button>
			</div>

			<div className="proj-details-info">

				{/* status */}
				<div className="proj-card-field">
					<span className="proj-card-label">Status</span>
					<p>{project.status.replace(/_/g, " ")}</p>
				</div>

				{/* deadline */}
				<div className="proj-card-field">
					<span className="proj-card-field">Deadline</span>
					<p>{project.deadline ?? "No deadline"}</p>
				</div>	
				
				{/* pattern */}
				<div className="proj-card-field">
					<span className="proj-card-label">Pattern</span>
					{patternId ? (
						<Link to={`/patterns/${patternId}`}>
							{`${p?.name} (${p?.brand})`}
						</Link>
					) : (
						<span>No pattern linked</span>
					)}
				</div>		
						
				{/* measurement notes */}
				<div className="proj-card-field">
					<span className="proj-card-label">Measurement Notes</span>
					<p>{project.measurement_notes || "-"}</p>
				</div>

				{/* project notes */}
 				<div className="proj-card-field">
 					<span className="proj-card-label">Notes</span>
 					<p className="proj-card-notes">{project.notes || "-"}</p>
 				</div>

				{/* date created/updated */}
				<p className="proj-card-meta">Created: {project.created_at}</p>
 				{project.updated_at && (
					<p className="proj-card-meta">Updated: {project.updated_at}</p>
				)}

			</div>

		</div>
	)
}