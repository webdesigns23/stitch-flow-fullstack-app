import { Link } from "react-router-dom"
import { NotebookText, CircleArrowRight, Spool, Lightbulb} from "lucide-react"


export default function DashboardMaterials({activeProjects}) {

	//Planning projects with patterns for materials list
	const materialsProjects = activeProjects
		?.filter(p => (p.status === "planning" && p?.pattern?.id)) || [];

	//Planning projects without a pattern 
	const projectsMissingPatterns = activeProjects.filter(
		project =>
			project.status === "planning" &&
			!project?.pattern?.id
	);
	
	const missingCount = projectsMissingPatterns.length;
	const materialsCount = materialsProjects.length;

	return (
		<div className="stat-gallery-item is-forth">
			{/*Materials List*/}
			<div className="total-pat-mat">
				<h2 className="dashboard-title">
					<Spool size={22} color="#9f831d"/>
					Gather Materials
				</h2>

				{/* Projects that need patterns */}
				{missingCount > 0 ? (
					<>
						<div>
							<span className="stat-value">
								{missingCount} 
							</span>
							
							<p className="totals-footer">
								{missingCount === 1
								? "Project needs a pattern"
								: "Projects need patterns"}
							</p>
						</div>
						</>
				) : (
					<div className="planning-complete">
						<p>
							All planned projects have patterns linked.
						</p>
					</div>
				)}

				<div className="stats-divider" />

				{/* Projects that need materials */}
				{materialsCount > 0 ? (
					<>
						<div>
							<span className="stat-value">
								{materialsCount} 
							</span>
							
							<p className="totals-footer">
								{materialsCount === 1
								? "Project needs materials"
								: "Projects need materials"}
							</p>
						</div>
					</>
				) : (
					<div className="planning-complete">
						<p>
							No materials to gather yet.
						</p>
					</div>
				)}


			</div>
			
			<footer className='dash-card-footer'>
				<Link to="/materials" className="go-link">
					View Materials Planner
					<CircleArrowRight size={16} />
				</Link>	
			</footer>
		</div>
	)
}

