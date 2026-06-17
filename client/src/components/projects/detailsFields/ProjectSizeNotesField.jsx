import { useBulletedTextField } from "../../hooks/useBulletedTextField";
import { PencilRuler } from "lucide-react"

export default function ProjectSizeNotesField({project, onUpdate}) {
	//Inline editing with bullets
		const field = useBulletedTextField({
			initialValue: project.measurement_notes,
			onSave: (measurement_notes) => onUpdate({measurement_notes}),
			useBullets: true,
		});

	return (
		<>
			{/* Size(measurement) notes */}
			<div className="proj-details-field">
				<span title="Click to Edit" className="proj-details-label">
					<PencilRuler 
						size={20} 
						color="#9f831d" 
						onClick={field.startEditing} 
						style={{ cursor: "pointer" }} 
					/> {" "} Size
				</span>

				{/* Editing notes opened */}
				{field.editing ? (
					<div>
						<textarea
							ref={field.textAreaRef}
							className="notes-textarea"
							value={field.value}
							onChange={(e) => field.setValue(e.target.value)}
							onKeyDown={field.handleKeyDown}
							maxLength={100}
							rows={5}
							autoFocus
						/>
						<button
							className="proj-card-btn-remove"
							onClick={field.save}>
							Save
						</button>
						<button
							className="proj-card-btn-remove"
							onClick={field.cancel}>
							Cancel
						</button>
					</div>
				) : (
					<p className="notes-display">
						{project.measurement_notes || "Click icon to add size notes"}
					</p>
				)}
			</div>
		</>
	)
}