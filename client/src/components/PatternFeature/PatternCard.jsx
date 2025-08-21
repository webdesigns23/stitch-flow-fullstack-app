import { useState } from "react";
import { Link } from "react-router-dom";

export default function PatternCard({pattern, handleDelete}) {


	return(
		<article className="pattern_card">
			<Link to={`/patterns/${pattern.id}`} className="card_link" aria-label={`${pattern.name}`}>
			<h2 className="card_title">{pattern.name}</h2>
			<p>Brand: {pattern.brand}</p>
			<p>Pattern #: {pattern.pattern_number}</p>
			<p>Category: {pattern.category}</p>
			</Link>

			{/* delete button */}
			{handleDelete && (
				<button className="delete_button" 
				onClick={(e) => { 
					e.preventDefault(); 
					e.stopPropagation(); 
					handleDelete();}}>
				X Remove
				</button>
			)}

		</article> 
	)
}