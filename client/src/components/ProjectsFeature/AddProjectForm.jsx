import {useState} from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const allowed_project_status = [
	"planning", "ready_to_sew", "cutting", "sewing", "final_touches", "complete"]

export default function AddProjectForm() {
	const [title, setTitle] = useState("");
	const [status, setStatus] = useState("planning");
	const [notes, setNotes] = useState("");
	// const { setProjects } = useOutletContext();
	// const navigate = UseNavigate();

	
	

	return(
		<>
			<h2>Add New Project</h2>
			<form>
				<label>Title:
					<input
					type="text"
					placeholder="Project Title"
					value={title}
					required
					/>
				</label>
				<label>Current Status:
					<select value={status}>
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
					required
					/>
				</label>
			</form>
		</>
	)
}