import { Link } from "react-router-dom"
import { NotebookText, CircleArrowRight, Spool, Lightbulb} from "lucide-react"


export default function DashboardMaterials({activeProjects}) {

	//Planning projects with patterns for materials list
	// const materialsProjects = activeProjects
	// 	?.filter(p => (p.status === "planning" && p?.pattern?.id)) || [];
	//Projects without a pattern 
	const projectsMissingPatterns = activeProjects.filter(
		project =>
			project.status === "planning" &&
			!project?.pattern?.id
	);
	
	const missingCount = projectsMissingPatterns.length;

	return (
		<div className="stat-gallery-item is-forth">
			{/*Materials List*/}
			<div className="total-pat-mat">
				<h2 className="dashboard-title">
					<Spool size={22} color="#9f831d"/>
					Next to Plan
				</h2>

				{missingCount > 0 ? (
					<>
						<div>
							<span className="stat-value">
								{missingCount} 
							</span>
							
							<p className="totals-footer">
								{missingCount === 1
								? "Project needs a pattern"
								: "Project needs patterns"}
							</p>
						</div>
						<div className="planning-callout">
							<Lightbulb size={22} aria-hidden="true" />
							<p>
								Visit Project Details to link a pattern.
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
			</div>
			
			<footer className='dash-card-footer'>
				<Link to="/materials" className="go-link">
					View Materials List
					<CircleArrowRight size={16} />
				</Link>	
			</footer>
		</div>
	)
}

