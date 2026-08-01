import { PatternContext } from "../../context/PatternContext"
import { ProjectContext } from "../../context/ProjectContext";
import { useContext } from "react";
import DashboardFocus from "./DashboardFocus";
import DashboardAtGlance from "./DashboardAtGlance";
import StatusPieChart from "./StatusPieChart";
import DashboardCompleted from "./DashboardCompleted";
import DashboardPlanner from "./DashboardPlanner";
import DashboardMaterials from "./DashboardMaterials";
import DashboardPattern from "./DashboardPatterns";
import "../../styles/Stats.css"


const STATUSES = [
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

	const statusCounts = getStatusCount(activeProjects);

	return (
		<div className="stat-gallery">
			{/* Due most urgently */}
			<DashboardFocus
				activeProjects={activeProjects}
				daysUntilDue={daysUntilDue} />

			{/* Overview of everything */}
			<DashboardAtGlance 
				activeProjects={activeProjects}
				projects={projects}
				patterns={patterns} 
				isDueSoon={isDueSoon} 
				isOverdue={isOverdue}
				daysOverdue={daysOverdue}
				daysUntilDue={daysUntilDue}
				statuses={STATUSES}/>

			
			{/* Pie chart */}
						<div className="stat-gallery-item is-wide">
							<div className="totals-chart-section">
								{/* Pie Chart */}
								<StatusPieChart 
									statusCounts={statusCounts} 
								/>						
							</div>
						</div>
						
			<DashboardMaterials 
				activeProjects={activeProjects}/>

			<DashboardPattern
				patterns={patterns} />

			{/* Weekly project planner */}
			<DashboardPlanner 
				activeProjects={activeProjects} 
				isDueSoon={isDueSoon} 
				isOverdue={isOverdue}
				daysOverdue={daysOverdue}
				daysUntilDue={daysUntilDue}/>	
		</div>
	)
}