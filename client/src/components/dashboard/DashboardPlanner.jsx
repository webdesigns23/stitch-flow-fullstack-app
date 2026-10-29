import { Link } from "react-router-dom"
import { useState } from "react";
import { getUrgencyClass, getDeadlineLabel, getWeekRange } from "../../utils/deadlines";
import { formatWeekday, formatDate} from "../../utils/dateTime";
import { capitalizeWords } from "../../utils/formatText";
import { planWork } from "../../utils/workPlan";
import '../../styles/DashboardPlanner.css'

const FLAG_LABELS = {
	on_track: "On Track",
	max_capacity: "Max Capacity",
	over_capacity: "Over Capacity",
	at_risk: "Hold Off",
};

const FLAG_MESSAGES = {
	on_track: "All deadlines will be met with a production schedule of 21 a week",
	max_capacity: "To hit every deadline, plan on making up to 28 a week",
	over_capacity: "Every deadline needs up to 35 a week, your best-week pace!",
	at_risk: "Over 35 a week. Hold off on new orders until you catch up!",
};

//Max weeks to show in production planner
const MAX_WEEKS = 10;

// const WEEK_NAMES = ["This week", "Next week"];
function weekName(index) {
	if (index === 0) return "This week";
	if (index === 1) return "Next week";
	return `Week ${index + 1}`;
}

export default function DashboardPlanner({activeProjects, isOverdue, daysOverdue, daysUntilDue}) {
	const [ weeksToShow, setWeeksToShow] = useState(1);

	//Plan what to sew each week, earliest deadline first
	const { flag, weeks, lateProjects } = planWork(activeProjects.filter(p => p.deadline));
	const hasWork = weeks.length > 0;

	//Dynamicaly show weeks of work, up to 8
	const maxWeeks = Math.min(weeks.length, MAX_WEEKS);
	const weekOptions = Array.from({ length: maxWeeks }, (_, i) => i + 1);
	const visibleWeeks = Math.min(weeksToShow, maxWeeks);
	const shownWeeks = weeks.slice(0, visibleWeeks);
	const hasProjects = shownWeeks.some(w => w.items.length > 0);
	

	//Days left until a project's deadline (negative when overdue)
	function daysLeft(p) {
		return isOverdue(p.deadline) ? -daysOverdue(p.deadline) : daysUntilDue(p.deadline);
	}

	return (
		<div className="stat-gallery-item is-full">
			<div className="upcoming-proj-header">
				<h2 className="dashboard-title">
					Production Planner
				</h2>

				{/* Week selector, only as many weeks as there is work for */}
				{weekOptions.length > 1 && (
					<nav className="pattern-project-filter-nav">
						{weekOptions.map(n => (
							<button
								key={n}
								className={`pattern-project-filter-pill ${visibleWeeks === n ? "active" : ""}`}
								onClick={() => setWeeksToShow(n)}
							>
								{n} {n === 1 ? "week" : "weeks"}
							</button>
						))}
					</nav>
				)}
				
			</div>

			{hasWork && (
				<>
					<div>
						<span className={`capacity-badge ${flag}`}>{FLAG_LABELS[flag]}</span>
						<p className={`work-plan-message ${flag}`}>
							{FLAG_MESSAGES[flag]}
						</p>	
						
					</div>
					<hr></hr>
				</>
			)}
			
			{lateProjects.length > 0 && (
				<p className="work-plan-alert">
					At risk at 21 a week: {lateProjects.map(p => capitalizeWords(p.title)).join(", ")}
				</p>
			)}
			

			{weeks.length > MAX_WEEKS && (
				<p className="work-plan-more">
					Booked {weeks.length} weeks out, showing the first {MAX_WEEKS}
				</p>
			)}

			{hasProjects ? (
				<div className="planner-weeks">
					{shownWeeks.map((week, index) => (
						<div className="week-group" key={week.start.getTime()}>
							<div className="week-label">
								{weekName(index)}: {getWeekRange(week.start)}
							</div>

							{/* Weekly total */}
							<div className="week-total">
								<span>Total to sew: </span>
								<span>
									{week.used} of {week.capacity}
								</span>
							</div>

							{week.items.length > 0 ? (
								<div className="upcoming-proj-main">
									{week.items.map(({ project: p, pieces, late }) => (
										<Link
											to={`/projects/${p.id}`}
											key={p.id}
											className={`upcoming-proj ${p?.status} ${late ? "late" : ""}`}
										>
											<div className="planner-date">
												<span className="planner-weekday">
													{formatWeekday(p?.deadline)}
												</span>
												<span className="planner-short-date">
													{formatDate(p?.deadline)}
												</span>
											</div>

											<div className="planner-proj-info">
												<span className="planner-proj-title">
													{capitalizeWords(p?.title)}
												</span>
												<span className="planner-proj-pieces">
													Sew {pieces} of {p.quantity || 1}
												</span>
												<span className={`planner-proj-deadline ${getUrgencyClass(daysLeft(p))}`}>
													{getDeadlineLabel(daysLeft(p), p.deadline)}
												</span>
											</div>
										</Link>
									))}
								</div>
							) : (
								<p className="week-empty">Nothing planned. You're ahead of schedule!</p>
							)}

						</div>
					))}
				</div>
			) : (
				<div className="empty-upcoming-proj">
					<span className="empty-planner-title">
					Add your first project to build your production schedule
					</span>
					<p className="empty-planner-text">
						Stitch Flow plans what to sew each week by deadline and quantity, and lets you know when you're at capacity.
					</p>
				</div>
				
			)}
		</div>
	)
}