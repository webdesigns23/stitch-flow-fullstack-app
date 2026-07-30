import StatusPieChart from "./StatusPieChart"
import { CircleCheckBig } from "lucide-react";

export default function DashboardCompleted({projects}) {

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
			{/* Completed this month and all time */}
			<div className="stat-gallery-completed">
				
				<CircleCheckBig color="#3ca74f"/>
		
				<div className="completed-info">
					<span className="stat-value">{totalCompleted}</span>
					<p className="totals-footer">Completed <br></br>This Month</p>
				</div>
			</div>	
		</>
	)
}