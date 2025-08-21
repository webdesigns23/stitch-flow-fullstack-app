import { useState, useContext } from "react";
import { PatternContext } from "../../context/PatternContext";
import "../../styles/Forms.css"


const emptyReqs = { role: "", material_type: "", quantity: "", unit: "", size: "" }

export default function AddPatternForm() {
	const { setPatterns, setLoading, setError} = useContext(PatternContext);

		//pattern
		const [name, setName] = useState("");
		const [brand, setBrand] = useState("");
		const [patternNumber, setPatternNumber] = useState("");
		const [category, setCategory] = useState("");
		const [notes, setNotes] = useState("");

		//pattern requirements
		const [requirements, setRequirements] = useState([{ ...emptyReqs}]);

		const [submitting, setSubmitting] = useState(false);

		//helper functions for dynamic rows for multiple pattern reqs
		function updateReq(index, key, value){
			setRequirements(rows => 
				rows.map((r, i) => 
					(i === index ? { ...r, [key]: value} : r )));
		};
			
		function addRow() {
			setRequirements(rows => [ ...rows, { ...emptyReqs}]);
		};

		function removeRow(index) {
			setRequirements(rows => (rows.length === 1 ? rows : rows.filter((_, i) => i !== index))); 
		};

	
		async function handlePatternSubmit(e) {
			e.preventDefault();
			setLoading(true);
    		setSubmitting(true);
    		setError(null);

			try{
				
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
			const response = await fetch("http://127.0.0.1:5555/patterns", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(newPattern),	
			})

			const data = await response.json()
			if (!response.ok) { 
					throw new Error("failed to add pattern.");
				}
			setPatterns(
				prev => [data, ...(Array.isArray(prev) ? prev : [])]);
			setName("");
			setBrand("");
			setPatternNumber("");
			setCategory("");
			setNotes("");
			setRequirements([{ ... emptyReqs}]);
			}catch (error){
			setError("Error creating pattern");
			}finally{
			setSubmitting(false);
			setLoading(false);
			}
		}

	return(
		<form className="p_form" onSubmit={handlePatternSubmit}>
			<h2>Add New Pattern:</h2>
				<label>Name:
					<input type="text" placeholder="Pattern Name" value={name}
					onChange={(e) => setName(e.target.value)} required />
				</label>
				<label>Brand:
					<input type="text" placeholder="Pattern Brand" value={brand}
					onChange={(e) => setBrand(e.target.value)} required />
				</label>
				<label>Pattern Number:
					<input type="text" placeholder="Pattern Number" value={patternNumber}
					onChange={(e) => setPatternNumber(e.target.value)} required />
				</label>
				<label>Category:
					<select value={category} 
						onChange={(e) => setCategory(e.target.value)} required>
					<option value="">Select Category</option>
					<option value="clothing">Clothing</option>
					<option value="accessories">Accessories</option>
					<option value="quilting">Quilting</option>
					<option value="home_decor">Home Decor</option>
					<option value="costumes">Costumes</option>
					<option value="other">Other</option>
					</select>
				</label>
				<label>Notes:
					<input type="text" placeholder="Notes" value={notes}
					onChange={(e) => setNotes(e.target.value)} />
				</label>
				
				{/* pattern reqs */}
				{requirements.map((req, index) => (
					<div key={index} className="add_requirements">
						<h3>Add Pattern Requirements {index +1}:</h3>
						<label>Role:
							<input type="text" placeholder="base fabric, interfacing, etc." value={req.role}
							onChange={(e) => updateReq(index, "role", e.target.value)} required />
						</label>
						<label>Material Type:
							<input type="text" placeholder="spandex, cotton, etc." value={req.material_type}
							onChange={(e) => updateReq(index, "material_type", e.target.value)} required />
						</label>
						<label>Quantity:
							<input type="number" step="0.01" placeholder="0.00" value={req.quantity}
							onChange={(e) => updateReq(index, "quantity", e.target.value)} required />
						</label>
						<label>Unit:
							<input type="text" placeholder="yds, ea, pcs, etc." value={req.unit}
							onChange={(e) => updateReq(index, "unit", e.target.value)} required />
						</label>
						<label>Size:
							<input type="text" placeholder="small, medium, 2, 4, etc." value={req.size}
							onChange={(e) => updateReq(index, "size", e.target.value)} required />
						</label>	

						<button type="button" onClick={() => removeRow(index)} disabled={requirements.length === 1}>Remove</button>	

					</div>
				))}
				<button type="button" onClick={addRow}> + Add Another Requirement</button>

				<button type="submit" disabled={submitting}>
					{submitting ? "Saving Pattern..." : "Save Pattern"}
				</button>
		</form>
	)
}