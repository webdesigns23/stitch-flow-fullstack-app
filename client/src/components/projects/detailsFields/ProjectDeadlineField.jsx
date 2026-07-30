import { useState, useContext } from "react";
import { CalendarDays } from "lucide-react"
import { formatFullDate } from "../../../utils/dateTime";
import { getDeadlineLabel } from "../../../utils/deadlines";
import { ProjectContext } from "../../../context/ProjectContext";

export default function ProjectDeadlineField({project, onUpdate, isCompleted}) {
	const [ editingDeadline, setEditingDeadline ] = useState(false);
	const [ deadlineValue, setDeadlineValue ] = useState(project.deadline);

	const { isOverdue, isDueSoon, daysOverdue, daysUntilDue } = useContext(ProjectContext)

	async function handleDeadlineSave(e) {
    	await onUpdate({ deadline: deadlineValue });
    	setEditingDeadline(false);
	}

	async function handleDeadlineEdit() {
		setDeadlineValue(project.deadline);
		setEditingDeadline(true);
	}


	return(
		<div className="proj-details-field">
			<span title="Click to Edit" className="proj-details-label">
				<CalendarDays 
					size={20} 
					color="#9f831d" 
					onClick={handleDeadlineEdit} 
					style={{ cursor: "pointer" }} 
					title="click to edit"
				/>{" "} Deadline
			</span>
				{editingDeadline ? (
					<div className="proj-deadline-edit">
						<input
							type="date"
							defaultValue={deadlineValue}
							onChange={(e) => setDeadlineValue(e.target.value)}
							autoFocus
						/>
						<button className="proj-card-btn"
							onClick={handleDeadlineSave}>
							Save
						</button>

						<button className="proj-card-btn-remove"
							onClick={() => setEditingDeadline(false)}>
							Cancel Edit
						</button>
			    	</div>
				) : (
					<div className="deadline-display">
						<span 
							className={
								!isCompleted && isOverdue(project?.deadline) 
								? "proj-card-deadline-overdue"
								: !isCompleted && isDueSoon(project?.deadline) 
								? "proj-card-deadline-due-soon"
								: "proj-card-deadline"}
						>
							{formatFullDate(project.deadline)} 
						</span>

						{!isCompleted && (isOverdue(project?.deadline) || isDueSoon(project?.deadline)) && (
							<p
								className={
									isOverdue(project?.deadline)
										? "deadline-days-overdue"
										: "deadline-days-soon"
								}
							>
								{getDeadlineLabel(
									daysUntilDue(project?.deadline),
									project?.deadline
								)}
							</p>
						)}

						{isCompleted && project.completed_at && (
							<p className="proj-card-finished">
								Finished: {formatFullDate(project.completed_at)}
							</p>
						)}
					</div>
				)}
		</div>	
	)
}

