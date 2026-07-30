import { Link } from "react-router-dom"
import { NotebookText, CircleArrowRight } from "lucide-react"

export default function DashboardMaterials({activeProjects}) {

	//Planning projects with patterns for materials list
	const materialsProjects = activeProjects
		?.filter(p => (p.status === "planning" && p?.pattern?.id)) || [];
	
	return (
		<div className="stat-gallery-item is-forth">
			{/*Materials List*/}
			<div >
				<h3 className="dashboard-title">Materials Needed</h3>

				{materialsProjects.length > 0 ? (
					<div>
						<div>

						<span className="stat-value">
							{materialsProjects.length} 
						</span>
						<p className="totals-footer">
							Planned Project{materialsProjects.length === 1 ? "" : "s"} with Linked Pattern
						</p>
						</div>
						<footer className='chart-footer'>
							<Link to="/patterns" className="focus-project-link">
								View Patterns
								<CircleArrowRight size={16} />
							</Link>	
						</footer>
					</div>
				) : (
					<p className="empty-materials">No planned projects with patterns linked</p>
				)}
			</div>

		</div>
	)
}

