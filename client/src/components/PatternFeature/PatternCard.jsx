import React from "react";


export default function PatternCard({pattern, handleDelete}) {

	return(
		<>
			<h2>{pattern.name}</h2>
			<p>Brand: {pattern.brand}</p>
			<p>Pattern Number: {pattern.pattern_number}</p>
			<p>Category: {pattern.category}</p>
			<p>Notes: {pattern.notes}</p>
			<button onClick={handleDelete}>Remove</button>
		</>
	)
}