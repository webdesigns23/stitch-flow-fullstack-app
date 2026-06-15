export default function DashboardTotals({projects, patterns}) {

	//Find totals for Projects, Patterns, Completed, Overdue, Due Soon
	const totalPatterns = patterns?.length || 0;
	const totalCompleted = projects?.filter(p => p.status === "complete").length || 0;
	const totalActiveProjects = projects?.length - totalCompleted || 0;

	return (
		<>
			<div className="stat-gallery-item is-compact">
				<h3>Active Projects</h3>
				<div className="stat-value">{totalActiveProjects}</div>
			</div>

			<div className="stat-gallery-item is-compact">
				<h3>Total Patterns</h3>
				<div className="stat-value">{totalPatterns}</div>
				
			</div>

			<div className="stat-gallery-item is-compact">
				<h3>Completed Projects</h3>
				<div className="stat-value">{totalCompleted}</div>
				<p>since January</p>
			</div>
		</>
	)
}