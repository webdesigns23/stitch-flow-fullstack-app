import { Link } from "react-router-dom";
import { capitalizeWords } from "../../utils/formatText";


export default function PatternCard({pattern}) {

	return(
		<article className="pattern_card">
			<Link to={`/patterns/${pattern.id}`} className="card_link" aria-label={`${pattern.name}`}>
			<h2>{capitalizeWords(pattern.name)}</h2>
			<p>Brand: {pattern.brand}</p>
			<p>Pattern #: {pattern.pattern_number}</p>
			<p>Category: {pattern.category}</p>
			</Link>
		</article> 
	)
}