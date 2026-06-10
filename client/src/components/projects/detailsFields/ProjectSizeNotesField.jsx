import { useEffect, useState } from "react";
import { PencilRuler, SquarePen } from "lucide-react"

export default function ProjectSizeNotesField({project, onUpdate}) {
	const [ editingSize, setEditingSize ] = useState(false);
	const [ sizeValue, setSizeValue ] = useState("");

	// Initialize inline edit values after data loads
	useEffect(() => {
		setSizeValue(project.measurement_notes || "");
	}, [project]);
				
	// Measurement notes
	async function handleSizeSave() {
		await onUpdate({ measurement_notes: sizeValue.trim() || null });
		setEditingSize(false);
	};


	return (
		<>
			{/* Size(measurement) notes */}
			<div className="proj-details-field">
				<span className="proj-details-label">
					<PencilRuler size={14} color="#9f831d" onClick={() => setEditingSize(true)} style={{ cursor: "pointer" }} />
					{" "} Size
				</span>
				{editingSize ? (
					<div>
						<textarea
							value={sizeValue}
							onChange={(e) => setSizeValue(e.target.value)}
							maxLength={100}
							rows={5}
							autoFocus
						/>
						<button
							className="proj-card-btn-remove"
							onClick={handleSizeSave}>
							Save
						</button>
						<button
							className="proj-card-btn-remove"
							onClick={() => setEditingSize(false)}>
							Cancel
						</button>
					</div>
				) : (
					<p>{project.measurement_notes || "-"}</p>
				)}
			</div>
		</>
	)
}