import StatusPieChart from "./StatusPieChart"

export default function DashboardTotals({projects, patterns, statuses,statusCounts}) {

	//Find totals for Projects, Patterns, Completed, Overdue, Due Soon
	const totalPatterns = patterns?.length || 0;
	const totalCompleted = projects?.filter(p => p.status === "complete").length || 0;
	const totalActiveProjects = projects?.length - totalCompleted || 0;

	return (
		<>
			{/* active total with pie chart */}
			<div className="stat-gallery-item is-wide">
				<div className="totals-chart-section">
					<div>
						<h3 className="totals-header">Active Projects</h3>
						<span className="stat-value">{totalActiveProjects}</span>
					</div>
					{/* Pie Chart */}
					<StatusPieChart 
						statusCounts={statusCounts} 
						statuses={statuses}/>
						
				</div>
			</div>

			{/* patterns total */}
			<div className="stat-gallery-item is-compact">
				<h3 className="totals-header">Total Patterns</h3>
				<div className="stat-value">{totalPatterns}</div>
			</div>

			{/* completed projects */}
			<div className="stat-gallery-item is-compact">
				<h3 className="totals-header">Completed Projects</h3>
				<div className="stat-value">{totalCompleted}</div>
				<p className="totals-footer">since January</p>
			</div>	
		</>
	)
}