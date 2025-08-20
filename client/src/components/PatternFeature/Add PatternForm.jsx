import { useState, useContext } from "react";
import { PatternContext } from "../../context/PatternContext";

export default function AddPatternForm() {
	const { setPatterns, setLoading, setError} = useContext(PatternContext);
		//pattern
		const [name, setName] = useState("");
		const [brand, setBrand] = useState("");
		const [patternNumber, setPatternNumber] = useState("");
		const [category, setCategory] = useState("");
		const [notes, setNotes] = useState("");

		//pattern requirements
		const [role, setRole] = useState("");
		const [materialType, setMaterialType] = useState("");
		const [quantity, setQuantity] = useState("");
		const [unit, setUnit] = useState("");
		const [size, setSize] = useState("");

		const [submitting, setSubmitting] = useState(false);
	
		async function handlePatternSubmit(e) {
			e.preventDefault();
			setLoading(true);
    		setSubmitting(true);
    		setError(null);

			try{
				if(!role.trim() || !materialType.trim() || quantity === "" || !unit.trim() || !size.trim()){
					throw new Error("Please fill out the pattern requirements.")
				}
			//normalize quantity
			const quantity_number = Number(quantity);
			if (Number.isNaN(quantity_number)){
				throw new Error("Quantity must be a number ('0.00').")
			}
			const quantityFormat = quantity_number.toFixed(2);

			const newPattern = {
				name: name.trim(),
				brand: brand.trim(),
				pattern_number: patternNumber.trim(),
				category: category.trim(),
				notes: notes.trim() || "",
				pattern_requirements: [
					{
					role: role.trim(),
					material_type: materialType.trim(),
					quantity: quantityFormat,
					unit: unit.trim(),
					size: size.trim(),
					},
				]
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
			setRole("");
			setMaterialType("");
			setQuantity("");
			setUnit("");
			setSize("");
			}catch (error){
			setError("Error loading project data", error);
			}finally{
			setSubmitting(false);
			setLoading(false);
			}
		}

	return(
		<form className="pattern_form" onSubmit={handlePatternSubmit}>
			<h2>Add Pattern</h2>
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

			<h3>Add Pattern Requirements</h3>
				<label>Role:
					<input type="text" placeholder="base fabric, interfacing, etc." value={role}
					onChange={(e) => setRole(e.target.value)} required />
				</label>
				<label>Material Type:
					<input type="text" placeholder="spandex, cotton, etc." value={materialType}
					onChange={(e) => setMaterialType(e.target.value)} required />
				</label>
				<label>Quantity:
					<input type="number" step="0.01" placeholder="0.00" value={quantity}
					onChange={(e) => setQuantity(e.target.value)} required />
				</label>
				<label>Unit:
					<input type="text" placeholder="yds, ea, pcs, etc." value={unit}
					onChange={(e) => setUnit(e.target.value)} required />
				</label>
				<label>Size:
					<input type="text" placeholder="small, medium, 2, 4, etc." value={size}
					onChange={(e) => setSize(e.target.value)} required />
				</label>		

				<button type="submit" disabled={submitting}>
					{submitting ? "Saving..." : "Save Pattern"}
				</button>
		</form>

	)
}