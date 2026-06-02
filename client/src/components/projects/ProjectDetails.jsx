import { CalendarDays } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PatternContext } from "../../context/PatternContext";
import { ProjectContext } from "../../context/ProjectContext";
import { fetchProjectById } from "../../api/projects";
import { capitalizeWords } from "../../utils/formatText";
import "../../styles/ProjectDetails.css";

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
	const [ editingDeadline, setEditingDeadline ] = useState(false);
	// const [ editing, setEditing ] = useState(false);
	// const [ editForm, setEditForm ] = useState({});	
	// const [ showChangePat, setShowChangePat ] = useState(false);


	//List Project Details By Id
	useEffect(() => {
		const loadProjectDetails = async() => {
			setProjLoading(true);
			setProjError(null);
			try{
				const data = await fetchProjectById(id);
				setProject(data);
				// setEditForm({
				// 	title: data.title || "",
				// 	status: data.status || "planning",
				// 	measurement_notes: data.measurement_notes || "",
				// 	deadline: data.deadline || "",
				// 	notes: data.notes || "",
				// 	pattern_id: data.pattern?.id ?? "",
				// });
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
	
	//Edit Status
	async function handleStatusChange(e) {
		e.stopPropagation();
		const updated = await updateProject(project.id, {status: e.target.value});
		setProject(updated);
	};

	//Edit Deadline to new date or null
	async function handleDeadlineChange(e) {
		e.stopPropagation();
		const updated = await updateProject(project.id, {deadline: e.target.value });
		setProject(updated);
		setEditingDeadline(false);
	};

	async function handleDeadlineClear(e) {
		const updated = await updateProject(project.id, {deadline: null });
		setProject(updated);
		setEditingDeadline(false);
	};

	//Edit Pattern
	// async function handlePatternChange(e) {
	// 	const newPattern = e.target.value ? Number(e.target.value) : null;
	// 	await updateProject(project.id, {pattern_id: newPattern});
	// }

	return(
		<div className="proj-details">
			<Link to="/projects">Back to All Projects</Link>
			
			<h1>{project.title}</h1>
			

			<div className="proj-details-info">

				{/* status */}
				<div className="proj-card-field">
					<span className="proj-card-label">Current Status</span>
					<div className="proj-status-radio">
						{statuses.map(s => (
							<label key={s} className="proj-status-option">
								<input
									type="radio"
									name="status"
									value={s}
									checked={project?.status === s}
									onChange={handleStatusChange}
								/>
								{s.replace(/_/g, " ")}
							</label>
						))}
					</div>
				</div>

				{/* deadline */}
				<div className="proj-card-field">
					<span className="proj-card-label">Deadline</span>
					
				
				{editingDeadline ? (
					<div>
						<input
							type="date"
							defaultValue={project.deadline || ""}
							onChange={handleDeadlineChange}
							autoFocus
						/>
						<button className="proj-card-btn-remove"
							onClick={() => handleDeadlineClear()}>No Deadline</button>
						<button className="proj-card-btn-remove"
							onClick={() => setEditingDeadline(false)}>Cancel Edit</button>
					</div>
				) : (
					<span onClick={() => setEditingDeadline(true)} style={{ cursor: "pointer" }} title="click to edit">
						<CalendarDays color="#b7951a" /> {project.deadline ?? "No Deadline"} 
					</span>
				)}
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

			<div>
				<button className="proj-card-btn-remove" onClick={handleDelete}>
					Delete Project
				</button>
			</div>
		</div>
	)
}