import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { capitalizeWords } from "../../utils/formatText";
import { formatDate, formatFullDate} from "../../utils/dateTime"
import { getCardDeadlineLabel } from "../../utils/deadlines";
import "../../styles/ProjectCard.css";
import { CalendarCheck, Ruler } from "lucide-react";
import empty_image from "../../assets/logo1.png"


const STATUSES = [
		"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"
	];

export default function ProjectCard({ project, isCompleted, daysToComplete}) {
	const { updateProject, isOverdue, isDueSoon, daysUntilDue} = useContext(ProjectContext);
	
	//projects pattern
	const pattern = project?.pattern;

	//Update Status on radio bar
	async function handleStatusChange(e) {
		e.stopPropagation();
		await updateProject(project?.id, {status: e.target.value});
	}

	// Find finished image -- add this inside the component before the return
	const finishedImage = project?.project_images?.find(img => img.image_type === "finished");

	return(
		<article className={
			isCompleted ? "kanban-card" :
			isOverdue(project?.deadline) ? "kanban-card-overdue":
			isDueSoon(project?.deadline) ? "kanban-card-due-soon":
			"kanban-card"}>

			<Link to={`/projects/${project?.id}`} className="card_link" aria-label={`${project?.title}`}>
				<div className="kanban-card-body">

					{/* finished photo or prompt -- only on completed cards */}
					{isCompleted && (
						<div className="completed-card-image">
							{finishedImage ? (
								<img
									src={finishedImage.secure_url}
									alt={`Finished ${project?.title}`}
									className="completed-card-img"
								/>
							) : (
								<div className="completed-card-no-img">
									<p>Add your finished photo...</p>
									<img
										src={empty_image}
										alt="placeholder image"
										className="completed-card-img empty"
									/>
									
								</div>
							)}
						</div>
  					)}

					{/* project title */}
					<h3 className="kanban-card-title">
						{capitalizeWords(project?.title)}
					</h3>

					{/* linked pattern or none */}
					{pattern ? (
						<p className="kanban-card-pattern">
							<Ruler size={12}/>
							{" "} {capitalizeWords(pattern?.name)}
						</p>
					) : (
						<p className="kanban-card-pattern none">
							<Ruler size={12}/>
							{" "} No Pattern Linked</p>
					)}

					{/* project deadline */}
					{isCompleted ? (
						<>						
							<div className="proj-card-deadline">
								Finished: {formatFullDate(project?.completed_at)}
							</div>
							<p className="proj-complete-time">
								Completed in 
								<strong> {daysToComplete}</strong> {daysToComplete === 1 ? "day" : "days"}
							</p>
						</>
					):(
						<span className={
							isOverdue(project?.deadline) 
								? "proj-card-deadline overdue"
								: isDueSoon(project?.deadline) 
								? "proj-card-deadline due-soon"
								: "proj-card-deadline"
							}
						>
							{isOverdue(project?.deadline) || isDueSoon(project?.deadline)
								? getCardDeadlineLabel(daysUntilDue(project?.deadline), project?.deadline)
								: `Due: ${formatDate(project?.deadline)}`
							}	
						</span>	
					)}
					
				</div>				
			</Link>

			{/* status dropdown */}
			{!isCompleted && (
				<div className="kanban-card-footer">
					<span className="kanban-card-status">
						Update Status:
					</span>
					<div className="kanban-select-wrapper">
						<span 
							className={`kanban-status-dot status-${project?.status}`}
							aria-hidden="true"
						/>

						<select 
							className="kanban-card-select" 
							value={project?.status} 
							onChange={handleStatusChange}
							aria-label={`Update status for ${project?.title}`}
						>
							{STATUSES.map(s => (
								<option key={s} value={s}>
									{s.replace(/_/g, " ")}
								</option>
							))}
						</select>
					</div>
					
				</div>
			)}
		</article>
	)
}

