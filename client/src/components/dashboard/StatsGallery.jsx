import { PatternContext } from "../../context/PatternContext"
import { ProjectContext } from "../../context/ProjectContext";
import { useContext } from "react";
import DashboardTotals from "./DashboardTotals";
import DashboardUrgency from "./DashboardUrgency";
import StatusPieChart from "./StatusChart";
import "../../styles/Stats.css"


const statuses = [
		"planning", "ready_to_sew", "cutting", "sewing", "final_touches", "complete"
	];

export default function StatsGallery() {
	const { 
		projects, loading: projLoading, error: projError, isOverdue, isDueSoon, daysOverdue, daysUntilDue
	} = useContext(ProjectContext);
	const { 
		patterns, loading: patLoading, error: patError 
	} = useContext(PatternContext);

	const loading = patLoading || projLoading;
	const error = patError || projError;

	//Current active projects
	const activeProjects = projects?.filter(p => p.status !== "complete") || [];

	function getStatusCount(projects) {
		return (projects || []).reduce((acc, p) => {
			const s = p.status;
			acc[s] = (acc[s] || 0) + 1;
			return acc;
		}, {})
	}

	const statusCounts = getStatusCount(projects);

	return (
		<div className="stat-gallery">
			{/* Basic Stats */}
			<DashboardTotals 
				projects={projects} 
				patterns={patterns}/>

			{/* Dynamic Stats */}
			<DashboardUrgency 	
				activeProjects={activeProjects} 
				isDueSoon={isDueSoon} 
				isOverdue={isOverdue}
				daysOverdue={daysOverdue}
				daysUntilDue={daysUntilDue}/>

			{/* Pie Chart */}
			<div className="stat-gallery-item is-wide">
				<h3>Projects by Progress</h3>
				<StatusPieChart 
					statusCounts={statusCounts} 
					statuses={statuses} />
			</div>
		</div>
	)
}