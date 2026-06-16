import { Link } from "react-router-dom"
import { ArrowRight, NotebookText } from "lucide-react"
import { capitalizeWords }from "../../utils/formatText"


export default function DashboardUrgency({activeProjects, isOverdue, isDueSoon, daysOverdue, daysUntilDue, projects}) {

	const overdueProjects = activeProjects.filter(p => isOverdue(p.deadline));
	const dueSoonProjects = activeProjects.filter(p => isDueSoon(p.deadline));

	//Planning projects with patterns for materials list
	const materialsProjects = projects
		?.filter(p => (p.status === "planning" && p?.pattern?.id)) || [];
	
	return (
		<>
			{/*Overdue Projects with list */}
			<div className="stat-gallery-item is-third overdue-card">
				<h3 className="overdue-heading">
					Overdue <span className="overdue-badge">{overdueProjects.length}</span>
				</h3>

				{overdueProjects.length > 0 && (
					<div className="stat-projects-list">
						<ul className="proj-urgent-list">
							{overdueProjects.map(p => (
								<li key={p.id}>
									<ArrowRight />
									<Link to={`/projects/${p.id}`}>{capitalizeWords(p.title)}</Link>
								</li>
							))}
						</ul>
					</div>
				)}				
			</div>

			{/*Due within 7 days with list */}
			<div className="stat-gallery-item is-third due-soon-card">
				<h3 className="due-soon-heading">
					Due soon <span className="due-soon-badge">{dueSoonProjects.length}</span>
				</h3>
				{dueSoonProjects.length > 0 && (
					<div className="stat-projects-list">
						<ul className="proj-urgent-list">
							{dueSoonProjects.map(p => (
								<li key={p.id}>
									<ArrowRight />
									<Link to={`/projects/${p.id}`}>{capitalizeWords(p.title)}</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/*Materials List*/}
			<div className="stat-gallery-item is-third">
				<h3 className="materials-heading">Materials Needed</h3>

				{materialsProjects.length > 0 ? (
					<div>
						<p className="materials-count">
							{materialsProjects.length} Planned Project{materialsProjects.length === 1 ? "" : "s"} with Linked Pattern
						</p>
						<Link to="/materials" className="materials-link">
						<NotebookText size={23} color="#9f831d"/>{" "} View materials list</Link>
					</div>
				) : (
					<p className="empty-materials">No planned projects with patterns linked</p>
				)}
				
			</div>
		</>
	)
}