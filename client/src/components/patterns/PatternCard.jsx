import { Link } from "react-router-dom";
import { Store, Hash } from "lucide-react"
import { capitalizeWords } from "../../utils/formatText";
import "../../styles/PatternPage.css"


export default function PatternCard({pattern}) {

	return(
		<article className="pat-card">
			<Link to={`/patterns/${pattern.id}`} 
				className="card_link" 
				aria-label={`${pattern?.name}`}>

				<div className="pat-card-meta">
					<h3 className="pat-card-title">
						{capitalizeWords(pattern?.name)}
					</h3>
					<div className="pat-card-body">
						<Store 
							size={16}
							color="#9f831d" />
						{" "} {capitalizeWords(pattern?.brand)} 
					</div>
						
					<div>
						<Hash
							size={16}
							color="#9f831d" />
						{" "} {pattern?.pattern_number}
					</div>

					<div className="pat-card-footer">
						<span className="pat-card-category">
							{pattern?.category.replace(/_/g, " ")}
						</span>
					</div>
					
				</div>
			</Link>
		</article> 
	)
}