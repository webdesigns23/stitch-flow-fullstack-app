import { useEffect, useState, useContext } from "react"
import { PatternContext } from "../../context/PatternContext";

export default function PatternSelect({value, onChange, required=true, disabled=false}) {
	const { 
		patterns, setPatterns, 
		loading, setLoading, 
		error, setError} = useContext(PatternContext);

	useEffect(() => {
		const fetchData = async() => {
		try{
			const response = await fetch("http://127.0.0.1:5555/patterns")
			if (!response.ok) {
			throw new Error(`HTTP error!: ${response.status}`);
			}
			const data = await response.json();
			setPatterns(Array.isArray(data) ? data : []);
		} catch (error){
			setError("Error loading patterns", error);
		}finally{
			setLoading(false);
		}
		};
		fetchData()
	}, [setPatterns, setLoading, setError])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>
	if (!patterns.length) return <p>No Patterns Yet</p>

	return(
		<>
			<select value = {value ?? ""} 
			onChange={(e) => onChange(Number(e.target.value))} 
			required={required} disabled={disabled}>

				<option value="" disabled> Choose a Pattern...</option>
				{patterns.map((p) => (
					<option key={p.id} value={p.id}>
						{p.name} ({p.brand})
					</option>
				))}
			</select>
		
		</>
	)
}