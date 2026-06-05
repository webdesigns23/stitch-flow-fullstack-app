import { capitalizeWords } from "../../../utils/formatText";

const statuses = [
	"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"
];

export default function ProjectStatusField({project, onUpdate}) {

	//Edit Status
	async function handleStatusChange(e) {
		await onUpdate({status: e.target.value});
	};

	return(
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
						{capitalizeWords(s).replace(/_/g, " ")}
					</label>
				))}
			</div>
		</div>
	)
}