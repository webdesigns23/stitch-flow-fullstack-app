import { useState } from "react";

export default function PatternCard({pattern, handleDelete}) {
	const [ showReq, setShowReq ] = useState(false);
	const [ requirements, setRequirements ] = useState(null)
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null)
	
	//Lists Requirments with Toggle button
	async function handleToggleReq() {
		setShowReq(!showReq);
		if (!showReq && !requirements)
		setLoading(true);
		setError(null);

		try{
			const response = await fetch(`http://127.0.0.1:5555/patterns/${pattern.id}/requirements`)
			if (!response.ok) {throw new Error(`HTTP error!: ${response.status}`);}
			const data = await response.json();
			setRequirements(Array.isArray(data) ? data : []);
			} catch (error){
			setError("Error loading pattern requirments data", error);
			}finally{
			setLoading(false);
			}
		}
	
		

	return(
		<>
			<h2>{pattern.name}</h2>

			<button className="delete_button" onClick={handleDelete}>Remove</button>

			<p>Brand: {pattern.brand}</p>
			<p>Pattern Number: {pattern.pattern_number}</p>
			<p>Category: {pattern.category}</p>
			<p>Notes: {pattern.notes}</p>

			<button onClick={handleToggleReq}>
				{showReq ? "Hide Requirements": "Show Requirements"}
			</button>

			{showReq && (
				<div>
					{requirements && requirements.length > 0 ? (
						<ul>
							{requirements.map((r) => (
								<li key={r.id}>
								{r.role}
								{r.material_type}
								{r.quantity}
								{r.unit}
								{r.size}
								</li>
							))}
						</ul>
					): (
						<p>No Requirements</p>
					)}
				</div>
			)}


			
		</>
	)
}