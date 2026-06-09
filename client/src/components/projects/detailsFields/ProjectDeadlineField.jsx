import { useState } from "react";
import { CalendarDays } from "lucide-react"
import { formatDate } from "../../../utils/formatDate";

export default function ProjectDeadlineField({project, onUpdate}) {
	const [ editingDeadline, setEditingDeadline ] = useState(false);
	const [ deadlineValue, setDeadlineValue ] = useState(project.deadline);

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
			<span className="proj-details-label">
				<CalendarDays 
					size={16} 
					color="#9f831d" 
					onClick={handleDeadlineEdit} 
					style={{ cursor: "pointer" }} 
					title="click to edit"
				/>{" "} Deadline
			</span>
				{editingDeadline ? (
					<div>
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
					<span className="proj-deadline">
						{" "} {formatDate(project.deadline) ?? "No Deadline"} 
					</span>
				)}
		</div>	
	)
}