import StatsCard from "./StatsCard"
import { ProjectContext } from "../../context/ProjectContext"
import { PatternContext } from "../../context/PatternContext"
import { useContext } from "react";

const statuses = [
		"planning", "ready_to_sew", "cutting", "sewing", "final_touches", "complete"
	];

export default function StatsGallery() {
	const { 
		projects, loading: projLoading, error: projError 
	} = useContext(ProjectContext);
	const { 
		patterns, loading: patLoading, error: patError 
	} = useContext(PatternContext);

	const loading = patLoading || projLoading;
	const error = patError || projError;

	const totalProjects = projects?.length || 0;
	const totalPatterns = patterns?.length || 0;

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
		<div className="gallery">
			<div className="gallery-item project-card">
				<h2>Total Projects</h2>
				<div className="stat-value">{totalProjects}</div>
			</div>
			<div className="gallery-item project-card">
				<h2>Total Patterns</h2>
				<div className="stat-value">{totalPatterns}</div>
			</div>
			<div className="gallery-item project-card">
				<h2>Projects by Status</h2>
				<ul className="status-list">
					{Object.entries(statusCounts).map(([status, count]) => (
						<li key={status}>
							{statuses[status] || status}: {count}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}