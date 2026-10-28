import { useState } from "react";
import { Users } from "lucide-react";

export default function ProjectQuantityField({ project, onUpdate }) {
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(project.quantity ?? 1);
	const [error, setError] = useState(null);

	async function handleSave() {
		try {
			setError(null);
			await onUpdate({ quantity: Number(value) });
			setEditing(false);
		} catch {
			setError("Quantity must be between 1 and 60");
		}
	}

	return (
		<div className="proj-details-field">
			<h2 title="Click to Edit" className="proj-details-label">
				<Users
					size={20}
					color="#9f831d"
					onClick={() => setEditing(true)}
					style={{ cursor: "pointer" }}
				/>{" "}Quantity
			</h2>

			{editing ? (
				<div className="proj-quantity-edit">
					<input
						type="number"
						min="1"
						max="40"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						autoFocus
					/>
					<button className="proj-card-btn" onClick={handleSave}>Save</button>
					<button className="proj-card-btn-remove" onClick={() => { setValue(project.quantity); setEditing(false); }}>
						Cancel
					</button>
					{error && <p className="form-error">{error}</p>}
				</div>
			) : (
				<div className="proj-quantity">
					<span className="proj-card-deadline quantity">
						{project.quantity}
					</span>
				</div>
			)}
		</div>
	);
}