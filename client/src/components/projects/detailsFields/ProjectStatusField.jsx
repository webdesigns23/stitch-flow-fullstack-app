import { capitalizeWords } from "../../../utils/formatText";

const statuses = [
	"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"
];

export default function ProjectStatusField({project, onUpdate}) {

	//Edit Status
	async function handleStatusChange(e) {
		await onUpdate({status: e.target.value});
	};

	//Progress Bar
	const currentIndex = statuses.indexOf(project.status);
	const progress = (currentIndex / (statuses.length - 1) * 100);

	return(
		<div className="proj-card-field">
			<span className="proj-card-label">Current Status</span>
			<div 
				className="proj-progress-bar"
				role="progressbar"
				aria-valuenow={currentIndex}
				aria-valuemin={0}
				aria-valuemax={statuses.length-1}
				aria-label={`Project status: ${project.status.replace(/_/g, " ")} `}>
				<div 
					className="proj-progress-fill" 
					style={{width:`${progress}%`}}/>
			</div>
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
						{capitalizeWords(s).replace(/_/g, " ")}
					</label>
				))}
			</div>
		</div>
	)
}