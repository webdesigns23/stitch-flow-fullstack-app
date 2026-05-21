import { useContext } from "react"
import { PatternContext } from "../../context/PatternContext";

export default function PatternSelect({value, onChange, required=true, disabled=false}) {
	const { 
		patterns,
		loading, 
		error} = useContext(PatternContext);

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>
	if (!patterns.length) return <p>No Patterns Yet</p>

	return(
		<>
			<select value = {value === null ? "none" : (value ?? "")} 
			onChange={(e) => {
				const val = e.target.value;
				onChange(val === "none" ? null : Number(val));
			}} 
			required={required} disabled={disabled}>

				<option value="" disabled> Choose a Pattern...</option>
				<option value="none">No Pattern Linked</option>
				{patterns.map((p) => (
					<option key={p.id} value={p.id}>
						{p.name} ({p.brand})
					</option>
				))}
			</select>
		
		</>
	)
}