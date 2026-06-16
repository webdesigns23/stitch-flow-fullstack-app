import StatusPieChart from "./StatusPieChart"

export default function DashboardTotals({projects, patterns, statuses,statusCounts}) {

	//Find totals for Projects, Patterns, Completed, Overdue, Due Soon
	const totalPatterns = patterns?.length || 0;
	const completedProjects = projects?.filter(p => p.status === "complete") || [];
	const totalCompleted = completedProjects.length;
	const totalActiveProjects = projects?.length - totalCompleted || 0;

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
			
			
			<div className="stat-gallery-item is-compact">
				{/* active total with pie chart */}
				<div className="active-proj-info">
					<h3 className="totals-header">Active Projects</h3>
					<span className="stat-value">{totalActiveProjects}</span>
				</div>

				{/* patterns total */}
				<div className="patterns-info">
					<h3 className="totals-header">Total Patterns</h3>
					<span className="stat-value">{totalPatterns}</span>
				</div>				
			</div>

			{/* active total with pie chart */}
			<div className="stat-gallery-item is-wide">
				<div className="totals-chart-section">
					{/* Pie Chart */}
					<StatusPieChart 
						statusCounts={statusCounts} 
						statuses={statuses}/>						
				</div>
			</div>
			<div className="stat-gallery-item is-compact">
				{/* completed this month */}
				<h3 className="totals-header">Completed Projects</h3>
				<div className="completed-info">
					<span className="stat-value">{totalCompleted}</span>
					<p className="totals-footer">this month</p>
				</div>

				{/* completed total projects */}
				<div className="completed-info">
					<span className="stat-value">{totalCompleted}</span>
					<p className="totals-footer">all time</p>
				</div>
			</div>	
		</>
	)
}