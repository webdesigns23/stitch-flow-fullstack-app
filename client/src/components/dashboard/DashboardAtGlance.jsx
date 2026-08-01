import StatusPieChart from "./StatusPieChart"
import { CircleCheckBig, Clock, CalendarX2 } from "lucide-react"
import { Link } from "react-router-dom";
import { NotebookText, } from "lucide-react"
import { capitalizeWords }from "../../utils/formatText"
import { formatDate } from "../../utils/dateTime";
import DashboardCompleted from "./DashboardCompleted";



export default function DashboardAtGlance({activeProjects, isOverdue, isDueSoon, daysOverdue, daysUntilDue, projects, patterns}) {

	const overdueProjects = activeProjects
		.filter(p => isOverdue(p.deadline))
		.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
	
	const dueSoonProjects = activeProjects
		.filter(p => isDueSoon(p.deadline))
		.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

	return (
		<div className="stat-gallery-item is-glance">
			<h2 className="dashboard-title">
				At a Glance
			</h2>
			<div className="glance-content">
				
				{/*Overdue Projects with list */}
				<div className="stat-gallery-overdue">
					<CalendarX2 size={40} color="#d47052"/>

					<div className="completed-info">
						<span className="stat-value">{overdueProjects.length}</span>
						<p className="totals-footer">Overdue</p>
					</div>
			
				</div>

				{/*Due within 7 days with list */}
				<div className="stat-gallery-due-soon">
					<Clock size={40} color="#bb9715"/>

					<div className="completed-info">
						<span className="stat-value">{dueSoonProjects.length}</span>
						<p className="totals-footer">Due Soon<br></br>(next 7 days)</p>
					</div>

				</div>
				
				{/* Completed this month and all time */}
				<div>
					<DashboardCompleted 
						projects={projects}/>
				</div>
			</div>

		</div>
	)
}

				