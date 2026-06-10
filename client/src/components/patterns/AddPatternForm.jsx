import { useState, useContext } from "react";
import { Scissors } from "lucide-react";
import { PatternContext } from "../../context/PatternContext";
import { createPattern } from "../../api/patterns";
import "../../styles/Forms.css"

const emptyReqs = { role: "", material_type: "", quantity: "", unit: "", size: "" }

export default function AddPatternForm({ onClose }) {
	const { setPatterns, setError } = useContext(PatternContext);

	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");
	const [patternNumber, setPatternNumber] = useState("");
	const [category, setCategory] = useState("");
	const [notes, setNotes] = useState("");
	const [requirements, setRequirements] = useState([{ ...emptyReqs }]);
	const [submitting, setSubmitting] = useState(false);

	function updateReq(index, key, value) {
		setRequirements(rows =>
			rows.map((r, i) => (i === index ? { ...r, [key]: value } : r)));
	}

	function addRow() {
		setRequirements(rows => [...rows, { ...emptyReqs }]);
	}

	function removeRow(index) {
		setRequirements(rows => (rows.length === 1 ? rows : rows.filter((_, i) => i !== index)));
	}

	async function handlePatternSubmit(e) {
		e.preventDefault();
		setSubmitting(true);
		setError(null);

		try {
			const newReqs = requirements.map(r => {
				const quantity_number = Number(r.quantity);
				if (Number.isNaN(quantity_number)) {
					throw new Error("Each requirement's quantity must be a number ('0.00')");
				}
				return {
					role: r.role.trim(),
					material_type: r.material_type.trim(),
					quantity: quantity_number.toFixed(2),
					unit: r.unit.trim(),
					size: r.size.trim(),
				};
			});

			if (newReqs.length === 0) {
				throw new Error("Add at least one pattern requirement.");
			}

			const newPattern = {
				name: name.trim(),
				brand: brand.trim(),
				pattern_number: patternNumber.trim(),
				category: category.trim(),
				notes: notes.trim() || "",
				pattern_requirements: newReqs,
			};

			const response = await createPattern(newPattern);
			if (!response.ok) {
				throw new Error("Failed to add pattern.");
			}

			const data = await response.json();
			setPatterns(prev => [data, ...(Array.isArray(prev) ? prev : [])]);
			setName("");
			setBrand("");
			setPatternNumber("");
			setCategory("");
			setNotes("");
			setRequirements([{ ...emptyReqs }]);
			if (onClose) onClose();

		} catch (error) {
			setError(error.message || "Error creating pattern.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form className="form" onSubmit={handlePatternSubmit}>
			<h2 className="form-heading">
				<Scissors size={30} color="#9f831d" />
				{" "} Add New Pattern
			</h2>

			<div className="form-row">
				<label>Name:
					<input type="text" placeholder="Pattern name" value={name}
						onChange={(e) => setName(e.target.value)} required />
				</label>
			</div>

			<div className="form-row">
				<label>Brand:
					<input type="text" placeholder="Pattern brand" value={brand}
						onChange={(e) => setBrand(e.target.value)} required />
				</label>
			</div>

			<div className="form-row">
				<label>Pattern Number:
					<input type="text" placeholder="Pattern number" value={patternNumber}
						onChange={(e) => setPatternNumber(e.target.value)} required />
				</label>
			</div>

			<div className="form-row">
				<label>Category:
					<select value={category} onChange={(e) => setCategory(e.target.value)} required>
						<option value="">Select category...</option>
						<option value="clothing">Clothing</option>
						<option value="accessories">Accessories</option>
						<option value="quilting">Quilting</option>
						<option value="home_decor">Home Decor</option>
						<option value="costumes">Costumes</option>
						<option value="other">Other</option>
					</select>
				</label>
			</div>

			<div className="form-row">
				<label>Notes:
					<textarea placeholder="Notes" value={notes}
						onChange={(e) => setNotes(e.target.value)}
						maxLength={250} />
				</label>
			</div>

			{/* Pattern requirements */}
			{requirements.map((req, index) => (
				<div key={index} className="form-req-block">
					<p className="form-req-label">Requirement {index + 1}</p>

					<div className="form-row">
						<label>Role:
							<input type="text" placeholder="base fabric, interfacing, etc." value={req.role}
								onChange={(e) => updateReq(index, "role", e.target.value)} required />
						</label>
					</div>

					<div className="form-row">
						<label>Material Type:
							<input type="text" placeholder="spandex, cotton, etc." value={req.material_type}
								onChange={(e) => updateReq(index, "material_type", e.target.value)} required />
						</label>
					</div>

					<div className="form-row form-row--split">
						<label>Quantity:
							<input type="number" step="0.01" placeholder="0.00" value={req.quantity}
								onChange={(e) => updateReq(index, "quantity", e.target.value)} required />
						</label>
						<label>Unit:
							<input type="text" placeholder="yds, ea, pcs" value={req.unit}
								onChange={(e) => updateReq(index, "unit", e.target.value)} required />
						</label>
						<label>Size:
							<input type="text" placeholder="S, M, 2, 4" value={req.size}
								onChange={(e) => updateReq(index, "size", e.target.value)} required />
						</label>
					</div>

					<div className="button-row button-row--left">
						<button type="button" onClick={() => removeRow(index)}
							disabled={requirements.length === 1}>
							Remove
						</button>
					</div>
				</div>
			))}

			<div className="button_row button_row--left">
				<button type="button" onClick={addRow}>+ Add Requirement</button>
			</div>

			<div className="button_row">
				<button type="submit" disabled={submitting}>
					{submitting ? "Saving..." : "Save Pattern"}
				</button>
			</div>
		</form>
	);
}