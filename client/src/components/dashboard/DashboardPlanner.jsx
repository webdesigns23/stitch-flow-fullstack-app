import { Link } from "react-router-dom"
import { CalendarRange } from "lucide-react";
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
	on_track: "Every deadline fits at 21 a week",
	max_capacity: "To hit every deadline, plan on up to 28 a week",
	over_capacity: "Every deadline needs up to 35 a week, your best-week pace",
	at_risk: "Over 35 a week. Hold off on new orders until you catch up!",
};

const WEEK_NAMES = ["This week", "Next week"];

export default function DashboardPlanner({activeProjects, isOverdue, daysOverdue, daysUntilDue}) {

	//Plan what to sew each week, earliest deadline first
	const { flag, weeks, lateProjects } = planWork(activeProjects.filter(p => p.deadline));
	const shownWeeks = weeks.slice(0, 2);
	const hasProjects = shownWeeks.some(w => w.items.length > 0);

	//Days left until a project's deadline (negative when overdue)
	function daysLeft(p) {
		return isOverdue(p.deadline) ? -daysOverdue(p.deadline) : daysUntilDue(p.deadline);
	}

	return (
		<div className="stat-gallery-item is-full">
			<div className="upcoming-proj-header">
				<h2 className="dashboard-title">
					<CalendarRange size={24} color="#9f831d" />Work Plan
				</h2>
				<span className={`capacity-badge ${flag}`}>{FLAG_LABELS[flag]}</span>
			</div>

			<p className={`work-plan-message ${flag}`}>{FLAG_MESSAGES[flag]}</p>
			<hr></hr>
			{lateProjects.length > 0 && (
				<p className="work-plan-alert">
					At risk at 21 a week: {lateProjects.map(p => capitalizeWords(p.title)).join(", ")}
				</p>
			)}

			{hasProjects ? (
				<div className="planner-weeks">
					{shownWeeks.map((week, index) => (
						<div className="week-group" key={week.start.getTime()}>
							<div className="week-label">
								{WEEK_NAMES[index]}: {getWeekRange(index * 7)}
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
					<span>Nothing to sew yet</span>
					<Link to="/projects">+ Add New Project</Link>
				</div>
			)}
		</div>
	)
}