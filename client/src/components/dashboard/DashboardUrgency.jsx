import { Link } from "react-router-dom"

//css range classes
function getUrgencyClass(daysLeft) {
	if(daysLeft < 0) return "overdue";
	if(daysLeft === 0) return "today";
	if(daysLeft <= 3) return "soon";
	if(daysLeft <= 7) return "week";
	if(daysLeft <= 14) return "early";
	return "coming-up";
}

function getDeadlineLabel(daysLeft) {
	if (daysLeft < 0) return "overdue";
	if(daysLeft === 0) return "due today";
	if (daysLeft === 1) return "due tomorrow"; 
	return `due in ${daysLeft} days`;
}


export default function DashboardUrgency({activeProjects, isOverdue, isDueSoon, daysOverdue, daysUntilDue}) {

	const overdueProjects = activeProjects.filter(p => isOverdue(p.deadline));
	const dueSoonProjects = activeProjects.filter(p => isDueSoon(p.deadline));
	
	//Active projects with num days left key added
	const withDeadlines = activeProjects
		.filter(p => p.deadline)
		.map(p => ({...p, daysLeft: (isOverdue(p.deadline) ? -daysOverdue(p.deadline) : daysUntilDue(p.deadline))
	})).sort((a, b) => a.daysLeft - b.daysLeft);

	//Get upcoming projects in 7,14,21,28 days
	const dayRanges = [7, 14, 21, 28];
	let upcomingProjects = [];
	let activeDayRange = null;

	for (const dayRange of dayRanges) {
		upcomingProjects = withDeadlines.filter(p => p.daysLeft <= dayRange);
		if (upcomingProjects.length > 0) {
			activeDayRange = dayRange;
			break;
		}
	}

	const rangeTitle = (activeDayRange === 7 || activeDayRange === null ? 
		"This week" : "Coming up");

	const rangeContext = (activeDayRange === 7 ? "" : activeDayRange ? `nothing due within 7 days, showing next ${activeDayRange} days` : "");

	return (
		<>
			{/*Overdue Projects with list */}
			<div className="stat-gallery-item is-compact">
				<h3># Overdue</h3>
				<div className="stat-value">{overdueProjects.length}</div>

				{overdueProjects.length > 0 && (
					<div className="stat-projects-list">
						<hr style={{margin:'40px'}}></hr>
						<ul className="proj-urgent-list">
							{overdueProjects.map(p => (
								<li key={p.id}>
									<Link to={`/projects/${p.id}`}>{p.title}</Link>
								</li>
							))}
						</ul>
					</div>
				)}
				
			</div>

			{/*Due within 7 days with list */}
			<div className="stat-gallery-item is-compact">
				<h3> # Due within a Week</h3>
				<div className="stat-value">{dueSoonProjects.length}</div>
				{dueSoonProjects.length > 0 && (
					<div className="stat-projects-list">
						<hr style={{margin:'40px'}}></hr>
						<ul className="proj-urgent-list">
							{dueSoonProjects.map(p => (
								<li key={p.id}>
									<Link to={`/projects/${p.id}`}>{p.title}</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/* Weekly Planning */}
			<div className="stat-gallery-item is-wide">
				<div className="upcoming-proj-header">
					<h3 className="day-range-title">{rangeTitle}</h3>
					{rangeContext && (
						<span className="day-range-context">{rangeContext}</span>
					)}
				</div>

				{/* show planning projects by range */}
				{upcomingProjects.length > 0 ? (
					<div className="upcoming-proj-main">
						{upcomingProjects.map(p => (
							<Link 
								to={`projects/${p.id}`} 
								key={p.id}
								className={`upcoming-proj ${getUrgencyClass(p.daysLeft)}`}>
								<span>{p.title}</span>
								<span>{getDeadlineLabel(p.daysLeft)}</span>
							</Link>
						))}
					</div>
				) : (
					<div className="empty-upcoming-proj">
						<span>No projects due in the next 28 days!</span>
						<Link to={/projects/}>+ Add New Project</Link>
					</div>
				)}
			</div>
		</>
	)
}