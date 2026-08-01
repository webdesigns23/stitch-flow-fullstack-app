import { Link } from "react-router-dom"
import { CircleArrowRight, Ruler } from "lucide-react"
import { capitalizeWords } from "../../utils/formatText";


export default function DashboardPattern({patterns = []}) {

	const totalPatterns = patterns?.length || 0;

	//find pattern category and counts
	const categoryCounts = patterns.reduce((acc, pattern) => {
		acc[pattern.category] = (acc[pattern.category] || 0) +1;
		return acc;
	}, {});

	return (
		<div className="stat-gallery-item is-forth">
			{/* Number of Patterns */}
			<div className="total-pat-mat">
				
				<h2 className="dashboard-title">
					<Ruler size={22} color="#9f831d"/>
					Total Patterns
				</h2>

				{totalPatterns > 0 ? (
					<>
						<div>
							<span className="stat-value">{totalPatterns}</span>
							<p className="totals-footer">
								Patterns in your library</p>
						</div>

						<div className="stats-divider" />
						
						<div className="pattern-category-section">
							<h3 className="pattern-category-heading">Category</h3>
							<ul  className="pattern-category-list">
								{Object.entries(categoryCounts)
									.sort(([, a], [, b]) => b - a)
									.map(([category, count]) => (
										<li key={category} className="pattern-category-item">
											<span className="pattern-category-name">
												{category.replace(/_/g, " ")}
											</span>
											<span className="pattern-category-count">
												{count}
											</span>	
										</li>
									))}
							</ul>
						</div>
					</>
				) : (
					<p className="empty-materials">No Patterns in your Library</p>
				)}
				
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