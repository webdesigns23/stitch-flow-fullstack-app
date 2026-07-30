import { Link } from "react-router-dom"
import { CircleArrowRight } from "lucide-react"

export default function DashboardPattern({patterns}) {

	const totalPatterns = patterns?.length || 0;

	return (
		<div className="stat-gallery-item is-forth">
			{/* Number of Patterns */}
			<div >
				
				<h3 className="dashboard-title">
					Total Patterns
				</h3>
				<span className="stat-value">{totalPatterns}</span>
				<p className="totals-footer">Patterns in your library</p>
				
			</div>
			<footer className='chart-footer'>
				<Link to="/patterns" className="focus-project-link">
					View Patterns
					<CircleArrowRight size={16} />
				</Link>	
			</footer>
			
		</div>
	)
}