import { Link } from "react-router-dom";
import { Goal, CircleArrowRight, TriangleAlert } from "lucide-react";
import { capitalizeWords } from "../../utils/formatText";
import { formatWeekday, formatDate } from "../../utils/dateTime";
import { getCardDeadlineLabel } from "../../utils/deadlines";
import placeholderImage from "../../assets/empty_image.png"


const PROGRESS = {
	planning: 10,
	ready_to_sew: 25,
	cutting: 40,
	sewing: 65,
	final_touches: 85,
	complete: 100
};

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

	// Percent of project complete
	const projectProgress = PROGRESS[focusProject?.status] ?? 0;

	// Show focus project thumbnail image
	const projectImage = focusProject?.project_images?.length > 0
		? focusProject.project_images[0].secure_url
		: placeholderImage;

	// No projects with deadlines
	if (!focusProject) {
		return (
			<div className="stat-gallery-item is-focus">

				<h2 className="dashboard-title">
					<Goal size={22} color="#9f831d" />
					Today's Focus
				</h2>

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
			<h2 className="dashboard-title">
				<Goal size={22} color="#9f831d" />
				Today's Focus
			</h2>
			
			{/* Multiple overdue warning */}
			{overdueProjects.length > 1 && (
				<div className="focus-overdue-count">
					<TriangleAlert size={16} />
					{" "}{overdueProjects.length} overdue projects
				</div>
			)}

			<div className="focus-content">

				{/* Project image */}
				<div className="focus-image-wrapper">
					<img
						src={projectImage}
						alt={focusProject?.title}
						className="dashboard-img"
					/>
				</div>

				{/* Focus Project Info*/}
				<div className="focus-project">

					<h3 className="focus-proj-title">{capitalizeWords(focusProject.title)}</h3>

					{/* Deadline Day/Date */}
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

					<div className="focus-date">
						<span className="focus-weekday">
							{formatWeekday(focusProject.deadline)}
						</span>

						<span className="focus-short-date">
							{formatDate(focusProject.deadline)}
						</span>
					</div>


					{/* current progress */}
					<div className="focus-progress">
						<span 
							className={`focus-status-dot status-${focusProject?.status}`}
						/>
						<p className={`focus-status ${focusProject.status}`}>
							{capitalizeWords(focusProject.status.replace(/_/g, " "))}
						</p>
						<div className="focus-progress-header">
							
							<span>Current Progress </span>
							<span>{projectProgress}%</span>
						</div>

						<div className="progress-track">
							<div
								className="progress-fill"
								style={{ width: `${projectProgress}%` }}
							/>
						</div>
					</div>					
				</div>
			</div>	

			<footer className='dash-card-footer'>
				<Link
					to={`/projects/${focusProject.id}`}
					className="go-link"
				>
					View Project
					<CircleArrowRight size={16} />
				</Link>
			</footer>
		</div>
	);
}