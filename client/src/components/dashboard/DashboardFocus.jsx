import { Link } from "react-router-dom";
import { Goal, CircleArrowRight, TriangleAlert } from "lucide-react";
import { capitalizeWords } from "../../utils/formatText";
import { formatWeekday, formatDate } from "../../utils/dateTime";
import { getCardDeadlineLabel } from "../../utils/deadlines";

export default function DashboardFocus({activeProjects, daysUntilDue}) {
// Active projects with deadlines + days left
	const projectsWithDeadlines = activeProjects
		.filter(p => p.deadline)
		.map(p => ({
			...p,
			daysLeft: daysUntilDue(p.deadline)
		}))
		.sort((a, b) => a.daysLeft - b.daysLeft);


	// Any overdue projects
	const overdueProjects = projectsWithDeadlines.filter(
		p => p.daysLeft < 0
	);


	// Highest priority project
	const focusProject = projectsWithDeadlines[0];


	// No projects with deadlines
	if (!focusProject) {
		return (
			<div className="stat-gallery-item is-focus">

				<h3 className="dashboard-title">
					<Goal size={22} color="#9f831d" />
					Today's Focus
				</h3>

				<div className="focus-empty">
					<p>No upcoming project deadlines.</p>

					<Link to="/projects" className="focus-project-link">
						View Projects
						<CircleArrowRight size={16} />
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="stat-gallery-item is-focus">
			<h3 className="dashboard-title">
				Today's Focus
			</h3>

			{/* Multiple overdue warning */}
			{overdueProjects.length > 1 && (
				<div className="focus-overdue-count">
					<TriangleAlert size={16} />
					{overdueProjects.length} overdue projects
				</div>
			)}

			<div className="focus-content">

				{/* Deadline */}
				<div className="focus-date">
					<span className="focus-weekday">
						{formatWeekday(focusProject.deadline)}
					</span>

					<span className="focus-short-date">
						{formatDate(focusProject.deadline)}
					</span>
				</div>


				{/* Project */}
				<div className="focus-project">

					<h4>{capitalizeWords(focusProject.title)}</h4>
					<p
						className={
							focusProject.daysLeft < 0
								? "focus-deadline overdue"
								: focusProject.daysLeft === 0
								? "focus-deadline today"
								: "focus-deadline"
						}
					>
						{getCardDeadlineLabel(focusProject.daysLeft)}
					</p>

					<Link
						to={`/projects/${focusProject.id}`}
						className="focus-project-link"
					>
						View Project
						<CircleArrowRight size={16} />
					</Link>

				</div>
			</div>
		</div>
	);
}