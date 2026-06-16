import { Link } from "react-router-dom"
import { CalendarRange } from "lucide-react";
import { getUrgencyClass, getDeadlineLabel, getWeekRange } from "../../utils/deadlines";

export default function DashboardPlanner({activeProjects, isOverdue, isDueSoon, daysOverdue, daysUntilDue}) {

	//Active projects with num days left key added
	const withDeadlines = activeProjects
		.filter(p => p.deadline)
		.map(p => ({...p, daysLeft: (isOverdue(p.deadline) ? -daysOverdue(p.deadline) : daysUntilDue(p.deadline))
	})).sort((a, b) => a.daysLeft - b.daysLeft);

	//Show this week and preview of next week planner
	const thisWeek = withDeadlines.filter(p => p.daysLeft <=7);
	const nextWeek = withDeadlines.filter(p => p.daysLeft > 7 && p.daysLeft <= 14);
	const hasProjects = thisWeek.length > 0 || nextWeek.length > 0; 


return (
		<div className="stat-gallery-item is-full">
			<div className="upcoming-proj-header">
				<h3 className="day-range-title">
					<CalendarRange size={25} color="#9f831d" /> {""}Weekly Schedule</h3>
				<span className="day-range-context">next two weeks</span>
			</div>

			{hasProjects ? (
				<div className="planner-weeks">

					{/* This weeks projects*/}
					<div className="week-group">
						<div className="week-label">This week: {getWeekRange(0)}</div>
						{thisWeek.length > 0 ? (
							<div className="upcoming-proj-main">
								{thisWeek.map(p => (
									<Link
										to={`/projects/${p.id}`}
										key={p.id}
										className={`upcoming-proj ${getUrgencyClass(p.daysLeft)}`}>
										<span>{p.title}</span>
										<span>{getDeadlineLabel(p.daysLeft, p.deadline)}</span>
									</Link>
								))}
							</div>
						) : (
							<p className="week-empty">Nothing due this week — get ahead on next week!</p>
						)}
					</div>
					

					{/* Next weeks projects*/}
					<div className="week-group">
						<div className="week-label">Next week: {getWeekRange(7)}</div>
						{nextWeek.length > 0 ? (
							<div className="upcoming-proj-main">
								{nextWeek.map(p => (
									<Link
										to={`/projects/${p.id}`}
										key={p.id}
										className={`upcoming-proj ${getUrgencyClass(p.daysLeft)}`}>
										<span>{p.title}</span>
										<span>{getDeadlineLabel(p.daysLeft, p.deadline)}</span>
									</Link>
								))}
							</div>
						) : (
							<p className="week-empty">Nothing due next week</p>
						)}
					</div>
				</div>
			) : (
				<div className="empty-upcoming-proj">
					<span>No projects due in the next two weeks</span>
					<Link to="/projects">+ Add New Project</Link>
				</div>
			)}
		</div>
	)
}
