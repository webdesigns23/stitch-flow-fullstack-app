import { useState } from "react";

export default function MeasurementsForm() {
	const [chest, setChest] = useState("");
	const [waist, setWaist] = useState("");
	const [hip, setHip] = useState("");
	const [girth, setGirth] = useState("");
	const [inseam, setInseam] = useState("");
	const [notes, setNotes] = useState("");
	const [submitting, setSubmitting] = useState(false);



	return(
		<>
			<form className="p_form" >
				<h2>Add New Measurments:</h2>
				{/* <div className="form_row">
					<label>Pattern:
						<PatternSelect value={patternId} onChange={setPatternId} />
					</label>
				</div> */}
				<div className="form_row">
					<label>Chest:
						<input
						type="text"
						placeholder="Chest Measurement"
						value={chest}
						onChange={(e) => setChest(e.target.value)}
						required
						maxLength={35}
						/>
					</label>
				</div>
				<div className="form_row">
					<label>Waist:
						<input
						type="text"
						placeholder="Waist Measurement"
						value={waist}
						onChange={(e) => setWaist(e.target.value)}
						required
						maxLength={35}
						/>
					</label>
				</div>
								<div className="form_row">
					<label>Hip:
						<input
						type="text"
						placeholder="Hip Measurement"
						value={hip}
						onChange={(e) => setHip(e.target.value)}
						required
						maxLength={35}
						/>
					</label>
				</div>
								<div className="form_row">
					<label>Girth:
						<input
						type="text"
						placeholder="Girth Measurement"
						value={girth}
						onChange={(e) => setGirth(e.target.value)}
						required
						maxLength={35}
						/>
					</label>
				</div>
				<div className="form_row">
					<label>Inseam:
						<input
						type="text"
						placeholder="Inseam Measurement"
						value={inseam}
						onChange={(e) => setInseam(e.target.value)}
						required
						maxLength={35}
						/>
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

				<div className="button_row">
					<button type="submit" disabled={submitting}>
						{submitting ? "Adding..." : "Add Measurements"}
					</button>
				</div>
			</form>
		</>
	)
}