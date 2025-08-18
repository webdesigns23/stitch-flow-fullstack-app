import {useState} from "react";
import { useOutletContext } from "react-router-dom";

const allowed_project_status = [
	"planning", "ready_to_sew", "cutting", "sewing", "final_touches", "complete"]

export default function AddProjectForm() {
	const [title, setTitle] = useState("");
	const [status, setStatus] = useState("planning");
	const [notes, setNotes] = useState("");
	const {setProjects, setError, setLoading} = useOutletContext();

	async function handleSubmit(e) {
		e.preventDefault();
		
		const newProject = {
			title: title.trim(),
			status,
			notes: notes.trim() || ""
		};
		try {
			const response = await fetch("http://127.0.0.1:5555/projects", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newProject),
		})
		const data = await response.json()
		if (!response.ok) {
				throw new Error("failed to add project");
			}
		setProjects((prev) => [data, ...prev]);

		setTitle("");
		setStatus("planning");
		setNotes("");
		}catch (error){
		setError("Error loading project data", error);
	  	}finally{
		setLoading(false);
		}
	}

	return(
		<>
			<h2>Add New Project</h2>
			<form onSubmit={handleSubmit}>
				<label>Title:
					<input
					type="text"
					placeholder="Project Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					/>
				</label>
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
				<label>Notes:
					<input
					type="text"
					placeholder="Notes"
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
					/>
				</label>
				<button type="submit">
					Add Project
				</button>
			</form>
		</>
	)
}