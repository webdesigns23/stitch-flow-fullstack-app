import { useEffect, useState } from "react";
import { PencilRuler, SquarePen } from "lucide-react"

export default function ProjectNotesField({project, onUpdate}) {
	const [ editingMeasurements, setEditingMeasurements ] = useState(false);
	const [ measurementsValue, setMeasurementsValue ] = useState("");
	const [ editingNotes, setEditingNotes ] = useState(false);
	const [ notesValue, setNotesValue ] = useState("");

	// Initialize inline edit values after data loads
	useEffect(() => {
		setMeasurementsValue(project.measurement_notes || "");
		setNotesValue(project.notes || "");
	}, [project]);
				
	// Measurement notes
	async function handleMeasurementsSave() {
		await onUpdate({ measurement_notes: measurementsValue.trim() || null });
		setEditingMeasurements(false);
	};

	// Notes
	async function handleNotesSave() {
		await onUpdate({ notes: notesValue.trim() || null });
		setEditingNotes(false);
	};

	return (
		<>
			{/* measurement notes */}
			<div className="proj-card-field">
				<span className="proj-card-label">
					<PencilRuler size={14} color="#9f831d" onClick={() => setEditingMeasurements(true)} style={{ cursor: "pointer" }} />
					{" "} Measurement Notes
				</span>
				{editingMeasurements ? (
					<div>
						<textarea
							value={measurementsValue}
							onChange={(e) => setMeasurementsValue(e.target.value)}
							maxLength={100}
							rows={5}
							autoFocus
						/>
						<button
							className="proj-card-btn-remove"
							onClick={handleMeasurementsSave}>
							Save Measurements
						</button>
						<button
							className="proj-card-btn-remove"
							onClick={() => setEditingMeasurements(false)}>
							Cancel
						</button>
					</div>
				) : (
					<p>{project.measurement_notes || "-"}</p>
				)}
			</div>

			{/* notes */}
			<div className="proj-card-field">
				<span className="proj-card-label">
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