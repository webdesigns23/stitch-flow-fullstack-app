import {useState, useContext} from "react";
import { ProjectContext } from "../context/ProjectContext";
import PatternSelect from "./PatternSelect";


export default function AddProjectForm() {
	const { setProjects, setLoading, setError} = useContext(ProjectContext);

	const [title, setTitle] = useState("");
	const [status, setStatus] = useState("planning");
	const [notes, setNotes] = useState("");
	const [patternId, setPatternId] = useState(null);
	const [submitting, setSubmitting] = useState(false);


	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);

		try {
			if (!title.trim()) throw new Error("Title is required");
      		if (title.trim().length > 35) throw new Error("Title max length is 35");
      		if (notes.trim().length > 100) throw new Error("Notes max length is 100");
      		if (!patternId) throw new Error("Please choose a pattern");

			setLoading(true);
			setSubmitting(true);
		
			const newProject = {
				title: title.trim(),
				status,
				notes: notes.trim() || "",
				pattern_id: patternId,
			};

			const token = localStorage.getItem("token");
			const response = await fetch("http://127.0.0.1:5555/projects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(token ? {Authorization: `Bearer ${token}`} : {}),
				},
				body: JSON.stringify(newProject),
			})
			const data = await response.json()
			if (!response.ok) {
					throw new Error(data?.error || `HTTP ${response.status}`);
				}
			setProjects(
				prev => [data, ...(Array.isArray(prev) ? prev : [])]);
			setTitle("");
			setStatus("planning");
			setNotes("");
			setPatternId(null);
			}catch (error){
			setError(error.message || "Error loading project data");
			console.error(error)
			}finally{
			setLoading(false);
			setSubmitting(false);
			}
		}

	return(
		<>
			<form className="p_form" onSubmit={handleSubmit}>
				<h2>Add New Project:</h2>

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
							onChange={(e) => setStatus(e.target.value)}>
						<option value="">Select Status</option>
						<option value="planning">Planning</option>
						<option value="ready_to_sew">Ready to Sew</option>
						<option value="cutting">Cutting</option>
						<option value="sewing">Sewing</option>
						<option value="final_touches">Final Touches</option>
						<option value="complete">Complete</option>
						</select>
					</label>
				</div>
				<div className="form_row">
					<label>Notes:
						<input
						type="text"
						placeholder="Notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						maxLength={100}
						/>
					</label>
				</div>
				<div className="form_row">
					<label>Pattern:
						<PatternSelect value={patternId} onChange={setPatternId} />
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