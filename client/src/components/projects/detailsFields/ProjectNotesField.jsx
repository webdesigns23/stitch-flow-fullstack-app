import { useEffect, useState } from "react";
import { PencilRuler, SquarePen } from "lucide-react"

export default function ProjectNotesField({project, onUpdate}) {
	const [ editingNotes, setEditingNotes ] = useState(false);
	const [ notesValue, setNotesValue ] = useState("");

	// Initialize inline edit values after data loads
	useEffect(() => {
		setNotesValue(project.notes || "");
	}, [project]);
				

	// Notes
	async function handleNotesSave() {
		await onUpdate({ notes: notesValue.trim() || null });
		setEditingNotes(false);
	};

	return (
		<>
			{/* notes */}
			<div className="proj-details-field">
				<span className="proj-details-label">
					<SquarePen size={14} color="#9f831d" onClick={() => setEditingNotes(true)} style={{ cursor: "pointer" }} />
					{" "} Notes
				</span>
				{editingNotes ? (
					<div>
						<textarea
							value={notesValue}
							onChange={(e) => setNotesValue(e.target.value)}
							maxLength={250}
							rows={5}
							autoFocus
						/>
						<button
							className="proj-card-btn-remove"
							onClick={handleNotesSave}>
							Save Notes
						</button>
						<button
							className="proj-card-btn-remove"
							onClick={() => setEditingNotes(false)}>
							Cancel
						</button>
					</div>
				) : (
					<p>{project.notes || "-"}</p>
				)}
			</div>
		</>
	)
}