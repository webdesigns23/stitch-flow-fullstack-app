import StatusPieChart from "./StatusPieChart"
import { CircleCheckBig } from "lucide-react";

export default function DashboardTotals({projects, statuses, statusCounts}) {

	//Find totals for Projects & Completed
	const completedProjects = projects?.filter(p => p.status === "complete") || [];
	const totalCompleted = completedProjects.length;
	
	//Find completed projects this month
	const now = new Date();

	const completedThisMonth = completedProjects.filter(p => {
		if (!p.completed_at) return false;
		const completedDate = new Date(p.completed_at);
		return completedDate.getMonth() === now.getMonth() &&
			completedDate.getFullYear() === now.getFullYear();
	}).length;

	return (
		<>
			{/* Daily focus */}
			<div className="stat-gallery-item is-wide">
				<h3 className="dashboard-title">
					Today's Focus
				</h3>
			</div>

			{/* Active total with pie chart */}
			<div className="stat-gallery-item is-wide">
				<div className="totals-chart-section">
					{/* Pie Chart */}
					<StatusPieChart 
						statusCounts={statusCounts} 
					/>						
				</div>
			</div>

			{/* Completed this month and all time */}
			<div className="stat-gallery-item is-compact">
				
				<CircleCheckBig size={28} color="#986f16"/>
				<h3 className="dashboard-title">
					Completed Projects
				</h3>
				<div className="completed-info">
					<span className="stat-value">{totalCompleted}</span>
					<p className="totals-footer">this month</p>
				</div>

				<div className="completed-info">
					<span className="stat-value">{totalCompleted}</span>
					<p className="totals-footer">all time</p>
				</div>
			</div>	
		</>
	)
}