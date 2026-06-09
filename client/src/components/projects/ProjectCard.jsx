import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { capitalizeWords } from "../../utils/formatText";
import { formatDate } from "../../utils/formatDate"
import "../../styles/ProjectCard.css";


const STATUSES = [
		"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"
	];

export default function ProjectCard({project}) {
	const { updateProject } = useContext(ProjectContext);
	const p = project?.pattern;

	//Update Status on radio bar
	async function handleStatusChange(e) {
		e.stopPropagation();
		await updateProject(project.id, {status: e.target.value});
	}

	//Deadline Checks
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const [month, day, year] = project.deadline.split("/");
	const deadlineDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

	//Past due date
	const isOverdue = deadlineDate < today;

	//Due in 7 days
	const isDueSoon = !isOverdue && (deadlineDate - today) <= 7 * 24 * 60 * 60 * 1000;

	return(
		<article className={`${isOverdue ? "kanban-card-overdue":
			isDueSoon ? "kanban-card-due-soon":
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
					<span className={`${isOverdue ? "kanban-card-deadline-overdue":
						isDueSoon ? "kanban-card-deadline-due-soon": "kanban-card-deadline"}`}>
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

