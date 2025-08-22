import { useEffect, useState, useContext } from "react";
import { PatternContext } from "../../context/PatternContext";

export default function EditPatternForm({pattern}) {
	const categories = [
	"clothing", "accessories", "quilting", "home_decor", "costumes", "other"];

	const { updatePattern, loading } = useContext(PatternContext);

	const [name, setName] = useState(pattern.name);
	const [brand, setBrand] = useState(pattern.brand);
	const [patternNumber, setPatternNumber] = useState(pattern.pattern_number);
	const [category, setCategory] = useState(pattern.category);
	const [notes, setNotes] = useState(pattern.notes);
	const [editError, setEditError] = useState(null);

	function handleSubmit() {
		
	}

	return (
		<form className="p_form" onSubmit={handleSubmit}>
			<h2>Edit Pattern:</h2>
				<label>Name:
					<input type="text" value={name}
					onChange={(e) => setName(e.target.value)} maxLength={35} />
				</label>
				<label>Brand:
					<input type="text"  value={brand}
					onChange={(e) => setBrand(e.target.value)} maxLength={35}/>
				</label>
				<label>Pattern #:
					<input type="text"  value={patternNumber}
					onChange={(e) => setPatternNumber(e.target.value)} maxLength={35}/>
				</label>
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
				<label>Notes:
					<input type="text" value={notes}
					onChange={(e) => setNotes(e.target.value)} maxLength={100} />
				</label>

				<button type="submit">Save Changes</button>
		</form>

	)
}