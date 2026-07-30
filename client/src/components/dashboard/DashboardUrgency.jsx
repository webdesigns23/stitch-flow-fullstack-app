import { Link } from "react-router-dom"
import { NotebookText } from "lucide-react"
import { capitalizeWords }from "../../utils/formatText"
import { formatDate } from "../../utils/dateTime";


export default function DashboardUrgency({activeProjects, isOverdue, isDueSoon, daysOverdue, daysUntilDue, projects, patterns}) {

	const overdueProjects = activeProjects
		.filter(p => isOverdue(p.deadline))
		.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
	
	const dueSoonProjects = activeProjects
		.filter(p => isDueSoon(p.deadline))
		.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
	
	//Total patterns
	const totalPatterns = patterns?.length || 0;

	//Planning projects with patterns for materials list
	const materialsProjects = projects
		?.filter(p => (p.status === "planning" && p?.pattern?.id)) || [];
	
	return (
		<>
			{/*Overdue Projects with list */}
			<div className="stat-gallery-item is-forth overdue-card">
				<h3 className="dashboard-title overdue">
					Overdue <span className="overdue-badge">{overdueProjects.length}</span>
				</h3>

				{overdueProjects.length > 0 ? (
					<div className="stat-projects-list">
						<ul className="proj-urgent-list">
							{overdueProjects.map(p => (
								<li key={p.id}>
									<Link to={`/projects/${p.id}`}>{capitalizeWords(p.title)}</Link>
								</li>
							))}
						</ul>
					</div>
				): (
					<p className="field-empty">Great Job!<br></br> No overdue projects.</p>
				)}				
			</div>

			{/*Due within 7 days with list */}
			<div className="stat-gallery-item is-forth due-soon-card">
				<h3 className="dashboard-title  due-soon">
					Due soon <span className="due-soon-badge">{dueSoonProjects.length}</span>
				</h3>
				{dueSoonProjects.length > 0 ? (
					<div className="stat-projects-list">
						<ul className="proj-urgent-list">
							{dueSoonProjects.map(p => (
								<li key={p.id}>
									<Link to={`/projects/${p.id}`}>{capitalizeWords(p.title)}</Link>
									<span>{formatDate(p.deadline)}</span>
								</li>
							))}
						</ul>
					</div>
				): (
					<p className="field-empty">Ahead of Schedule!</p>
				)}
			</div>

		</>
	)
}