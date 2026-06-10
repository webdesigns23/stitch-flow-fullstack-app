import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { capitalizeWords } from "../../utils/formatText";
import { formatDate } from "../../utils/dateUtils"
import "../../styles/ProjectCard.css";


const STATUSES = [
		"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"
	];

export default function ProjectCard({project}) {
	const { updateProject, isOverdue, isDueSoon } = useContext(ProjectContext);
	const p = project?.pattern;

	//Update Status on radio bar
	async function handleStatusChange(e) {
		e.stopPropagation();
		await updateProject(project.id, {status: e.target.value});
	}

	return(
		<article className={`${isOverdue(project.deadline) ? "kanban-card-overdue":
			isDueSoon(project.deadline) ? "kanban-card-due-soon":
			"kanban-card"}`}>

			<Link to={`/projects/${project.id}`} className="card_link" aria-label={`${project.title}`}>
				<div className="kanban-card-body">

					{/* project title */}
					<h3 className="kanban-card-title">
						{capitalizeWords(project.title)}
					</h3>

					{/* linked pattern or none */}
					{p ? (
						<p className="kanban-card-pattern">
						{capitalizeWords(p?.name)}
						</p>
					) : (
						<p className="kanban-card-pattern">No Pattern Linked</p>
					)}

					{/* project deadline */}
					<span className={`${isOverdue(project.deadline) ? "proj-card-deadline-overdue":
						isDueSoon(project.deadline) ? "proj-card-deadline-due-soon": "proj-card-deadline"}`}>
						Due: {formatDate(project?.deadline)}
					</span>	

				</div>				
			</Link>

			{/* status dropdown */}
			<div className="kanban-card-footer">
				<span className="kanban-card-status">Update Status:</span>
				<select 
					className="kanban-card-select" 
					value={project?.status} 
					onChange={handleStatusChange}>
					
					{	STATUSES.map(s => (
						<option key={s} value={s}>
							{s.replace(/_/g, " ")}
						</option>
					))}
				</select>
			</div>
			
		</article>
	)
}

