import { Link } from "react-router-dom"
import { CircleArrowRight } from "lucide-react"


export default function DashboardPattern({patterns}) {

	const totalPatterns = patterns?.length || 0;

	return (
		<div className="stat-gallery-item is-forth">
			{/* Number of Patterns */}
			<div >
				
				<h2 className="dashboard-title">
					Total Patterns
				</h2>
				<span className="stat-value">{totalPatterns}</span>
				<p className="totals-footer">Patterns in your library</p>
				
			</div>
			<footer className='dash-card-footer'>
				<Link to="/patterns" className="go-link">
					View Patterns
					<CircleArrowRight size={16} />
				</Link>	
			</footer>
			
		</div>
	)
}