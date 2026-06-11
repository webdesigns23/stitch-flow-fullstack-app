import { PatternContext } from "../../context/PatternContext"
import { ProjectContext } from "../../context/ProjectContext";
import { useContext } from "react";
import "../../styles/Stats.css"
import StatusPieChart from "./StatusChart";

const statuses = [
		"planning", "ready_to_sew", "cutting", "sewing", "final_touches", "complete"
	];

export default function StatsGallery() {
	const { 
		projects, loading: projLoading, error: projError, isOverdue, isDueSoon
	} = useContext(ProjectContext);
	const { 
		patterns, loading: patLoading, error: patError 
	} = useContext(PatternContext);

	const loading = patLoading || projLoading;
	const error = patError || projError;

	//Completed projects
	const activeProjects = projects?.filter(p => p.status !== "complete") || [];

	//Find totals for Projects, Patterns, Completed, Overdue, Due Soon
	const totalPatterns = patterns?.length || 0;
	const totalCompleted = projects?.filter(p => p.status === "complete").length || 0;
	const totalActiveProjects = projects?.length - totalCompleted || 0;
	const totalOverdue = activeProjects.filter(p => isOverdue(p.deadline)).length;
	const totalDueSoon = activeProjects.filter(p => isDueSoon(p.deadline)).length;

	function getStatusCount(projects) {
		const counts = {};
		for (const p of projects || []) {
			const key = (p.status);
			counts[key] = (counts[key] || 0) + 1;
		}
		return counts;
	}

	const statusCounts = getStatusCount(projects);

	return (
		<div className="stat-gallery">
			<div className="stat-gallery-item is-compact">
				<h3># Overdue</h3>
				<div className="stat-value">{totalOverdue}</div>
			</div>

			<div className="stat-gallery-item is-compact">
				<h3> # Due within a Week</h3>
				<div className="stat-value">{totalDueSoon}</div>
			</div>

			<div className="stat-gallery-item is-compact">
				<h3>Total Projects</h3>
				<div className="stat-value">{totalActiveProjects}</div>
			</div>

			<div className="stat-gallery-item is-compact">
				<h3>Total Patterns</h3>
				<div className="stat-value">{totalPatterns}</div>
			</div>

			<div className="stat-gallery-item is-compact">
				<h3>Completed Projects</h3>
				<div className="stat-value">{totalCompleted}</div>
			</div>

			<div className="stat-gallery-item is-wide">
				<h3>Projects by Progress</h3>
				<StatusPieChart statusCounts={statusCounts} statuses={statuses} />
			</div>
		</div>
	)
}