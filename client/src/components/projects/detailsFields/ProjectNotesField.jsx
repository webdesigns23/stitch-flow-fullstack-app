import { useBulletedTextField } from "../../hooks/useBulletedTextField";
import { SquarePen } from "lucide-react"

export default function ProjectNotesField({project, onUpdate}) {
	//Inline editing with bullets
	const field = useBulletedTextField({
		initialValue: project.notes,
		onSave: (notes) => onUpdate({notes}),
		useBullets: true,
	});

	return (
		<>
			{/* notes */}
			<div className="proj-details-field">
				<span title="Click to Edit" className="proj-details-label">
					<SquarePen 
						size={20} 
						color="#9f831d" 
						onClick={field.startEditing} 
						style={{ cursor: "pointer" }} 
						
					/>
					{" "} Notes
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
							maxLength={500}
							rows={8}
						/>
						<div className="notes-actions">
							<button
								className="proj-card-btn-remove"
								onClick={field.save}>						Save
							</button>
							<button
								className="proj-card-btn-remove"
								onClick={field.cancel}>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<p className="notes-display">
						{project.notes || "Click icon to add notes"}
					</p>
				)}
			</div>
		</>
	)
}