import { Link } from "react-router-dom";
import { capitalizeWords } from "../../utils/formatText";
import "../../styles/PatternPage.css"


export default function PatternCard({pattern}) {

	return(
		<article className="pat-card">
			<Link to={`/patterns/${pattern.id}`} 
				className="card_link" 
				aria-label={`${pattern.name}`}>

				<div className="pat-card-meta">
					<h3 className="pat-card-title">
						{capitalizeWords(pattern.name)}
					</h3>
					<p className="pat-card-body">
						{capitalizeWords(pattern.brand)} ({pattern.pattern_number})
					</p>

					<p className="pat-card-category">
						{pattern.category}
					</p>
				</div>
			</Link>
		</article> 
	)
}