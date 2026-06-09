import { useState } from "react";
import { CalendarDays } from "lucide-react"
import { formatDate } from "../../../utils/formatDate";

export default function ProjectDeadlineField({project, onUpdate}) {
	const [ editingDeadline, setEditingDeadline ] = useState(false);

	async function handleDeadlineChange(e) {
    	await onUpdate({ deadline: e.target.value });
    	setEditingDeadline(false);
	}

	async function handleDeadlineClear() {
		await onUpdate({ deadline: null });
		setEditingDeadline(false);
	}

	return(
		<div className="proj-details-field">
			<span className="proj-details-label">
				<CalendarDays size={16} color="#9f831d" 
					onClick={() => setEditingDeadline(true)} 
					style={{ cursor: "pointer" }} 
					title="click to edit"
				/>{" "} Deadline
			</span>
				{editingDeadline ? (
					<div>
						<input
							type="date"
							defaultValue={project.deadline || ""}
							onChange={handleDeadlineChange}
							autoFocus
						/>
						<button className="proj-card-btn-remove"
							onClick={handleDeadlineClear}>No Deadline</button>
						<button className="proj-card-btn-remove"
							onClick={() => setEditingDeadline(false)}>Cancel Edit</button>
			    	</div>
				) : (
					<span 
						className="proj-deadline"
						
					>
						
							{" "} {formatDate(project.deadline) ?? "No Deadline"} 
					</span>
				)}
		</div>	
	)
}