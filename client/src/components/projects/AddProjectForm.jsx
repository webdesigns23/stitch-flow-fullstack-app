import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { PencilRuler } from "lucide-react"
import { ProjectContext } from "../../context/ProjectContext";
import PatternSelect from "./PatternSelect";
import { createProject } from "../../api/projects";

const STATUSES = [
	"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"
];

export default function AddProjectForm({ onClose }) {
	const { setProjects, setError } = useContext(ProjectContext);

	const [title, setTitle] = useState("");
	const [status, setStatus] = useState("planning");
	const [deadline, setDeadline] = useState("");
	const [measurements, setMeasurements] = useState("");
	const [notes, setNotes] = useState("");
	const [patternId, setPatternId] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);

		try {
			if (!title.trim()) throw new Error("Title is required");
			if (title.trim().length > 35) throw new Error("Title max length is 35");
			if (measurements.trim().length > 100) throw new Error("Notes max length is 100");
			if (notes.trim().length > 250) throw new Error("Notes max length is 250");

			setSubmitting(true);

			const newProject = {
				title: title.trim(),
				status,
				deadline: deadline || null,
				measurement_notes: measurements.trim() || null,
				notes: notes.trim() || "",
				pattern_id: patternId ?? null,
			};

			const response = await createProject(newProject);
			const data = await response.json()
			if (!response.ok) {
				throw new Error(data?.error || `HTTP ${response.status}`);
			}

			setProjects(
				prev => [data, ...(Array.isArray(prev) ? prev : [])]);
			onClose();
			navigate(`/projects/${data.id}`)

		} catch (error) {
			setError(error.message || "Error loading project data");
			console.error(error)
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<form className="form" onSubmit={handleSubmit}>
				<h2 className="form-heading">
					<PencilRuler 
						size={30}
						color="#9f831d"/>
					{" "} Add New Project
				</h2>

				<div className="form_row">
					<label>Title:
						<input
							type="text"
							placeholder="Project Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							maxLength={35}
						/>
					</label>
				</div>

				<div className="form_row">
					<label>Current Status:
						<select value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="">Select Current Status...</option>
							{STATUSES.map(s => (
								<option key={s} value={s}>
									{s.replace(/_/g, " ")}
								</option>
							))}
						</select>
					</label>
				</div>

				<div className="form_row">
					<label>Deadline:
						<input
							type="date"
							placeholder="Deadline"
							value={deadline}
							onChange={(e) => setDeadline(e.target.value)}
							maxLength={100}
						/>
					</label>
				</div>

				<div className="form_row">
					<label>Measurements:
						<input
							type="text"
							placeholder="Measurement Notes"
							value={measurements}
							onChange={(e) => setMeasurements(e.target.value)}
							maxLength={100}
						/>
					</label>
				</div>

				<div className="form_row">
					<label>Pattern:
						<PatternSelect value={patternId} onChange={setPatternId} />
					</label>
				</div>

				<div className="form_row">
					<label>Notes:
						<textarea
							type="text"
							placeholder="Notes"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							maxLength={250}>
						</textarea>
					</label>
				</div>

				<div className="button_row">
					<button type="submit" disabled={submitting}>
						{submitting ? "Adding..." : "Add Project"}
					</button>
				</div>
			</form>
		</>
	)
}