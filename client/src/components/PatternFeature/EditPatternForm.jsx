import { useEffect, useState, useContext } from "react";
import { PatternContext } from "../../context/PatternContext";

export default function EditPatternForm({pattern, handlePatternUpdated}) {
	const categories = [
	"clothing", "accessories", "quilting", "home_decor", "costumes", "other"];

	const { updatePattern, loading } = useContext(PatternContext);

	const [name, setName] = useState(pattern.name);
	const [brand, setBrand] = useState(pattern.brand);
	const [patternNumber, setPatternNumber] = useState(pattern.pattern_number);
	const [category, setCategory] = useState(pattern.category);
	const [notes, setNotes] = useState(pattern.notes);
	const [editError, setEditError] = useState(null);

	function validateEdits() {
		if (name.trim().length > 35) 
			return setEditError("Name must be <35 characters.");
		if (brand.trim().length > 35)
			return setEditError("Brand must be <35 characters.");
		if (patternNumber.trim().length > 35)
			return setEditError("Pattern # must be <35 characters.");
		if (!categories.includes(category))
			return setEditError("Invalid Category");
		if (notes.trim().length > 100)
			return setEditError("Notes must be <100 characters.");
		return null;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setEditError(null);

		const error = validateEdits();
		if (error) {
			setEditError(error);
			return;
		}

		const patternEdits = {
			name: name.trim(),
			brand: brand.trim(),
			pattern_number: patternNumber.trim(),
			category,
			notes: notes.trim(),
		};

		const response = await updatePattern(pattern.id, patternEdits);
		if (response.ok) {
			handlePatternUpdated?.(response.data);
		}else {
			setEditError (response.error?.message || "Unable to update Pattern");
		}
	}

	if (editError) return <p>Error: {editError}</p>

	return (
		<form className="p_form" onSubmit={handleSubmit}>
			<h2>Edit Pattern:</h2>
			<div className="form_row">
				<label>Name:
					<input type="text" value={name}
					onChange={(e) => setName(e.target.value)} maxLength={35} />
				</label>
			</div>	
			<div className="form_row">
				<label>Brand:
					<input type="text"  value={brand}
					onChange={(e) => setBrand(e.target.value)} maxLength={35}/>
				</label>
			</div>
			<div className="form_row">
				<label>Pattern #:
					<input type="text"  value={patternNumber}
					onChange={(e) => setPatternNumber(e.target.value)} maxLength={35}/>
				</label>
			</div>
			<div className="form_row">		
				<label>Category:
					<select value={category} 
						onChange={(e) => setCategory(e.target.value)} >
					<option value="">Select Category</option>
					<option value="clothing">Clothing</option>
					<option value="accessories">Accessories</option>
					<option value="quilting">Quilting</option>
					<option value="home_decor">Home Decor</option>
					<option value="costumes">Costumes</option>
					<option value="other">Other</option>
					</select>
				</label>
			</div>
			<div className="form_row">
				<label>Notes:
					<input type="text" value={notes}
					onChange={(e) => setNotes(e.target.value)} maxLength={100} />
				</label>
			</div>
				<button className="button_row" type="submit">Save Changes</button>
		</form>

	)
}