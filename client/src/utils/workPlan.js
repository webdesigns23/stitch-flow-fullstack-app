import { parseDeadline, getToday } from "./dateTime";

//Work weekly planner helpers
export {
	scheduleWork, //calculating per week expectation, what the schedule pace is
	planWork, //Find the pace that hits every deadline, how busy currently are
}


//Pace levels, finished pieces per day (7 days a week)
export const CAPACITY_LEVELS = [
	{ flag: "on_track", perDay: 3 },        // 21 a week
	{ flag: "max_capacity", perDay: 4 },    // 28 a week
	{ flag: "over_capacity", perDay: 5 },   // 35 a week
];
const DAYS_PER_WEEK = 7;

//Schedule every piece, earliest deadline first, in rolling 7-day weeks starting today
function scheduleWork(activeProjects, perDay, today = getToday()) {
	//Queue of active projects by deadline
	const queue = activeProjects
		.map(p => ({ project: p, deadline: parseDeadline(p.deadline), remaining: p.quantity || 1 }))
		.sort((a, b) => a.deadline - b.deadline);

	const weeks = [];
	const finishDates = new Map();
	const day = new Date(today);
	let next = 0;

	for (let dayIndex = 0; next < queue.length && dayIndex < 365; dayIndex++) {
		const weekIndex = Math.floor(dayIndex / DAYS_PER_WEEK);
		if (!weeks[weekIndex]) {
			const start = new Date(today);
			start.setDate(today.getDate() + weekIndex * DAYS_PER_WEEK);
			weeks[weekIndex] = { start, used: 0, capacity: perDay * DAYS_PER_WEEK, items: new Map() };
		}
		const week = weeks[weekIndex];

		// Each day has the same number of pieces to give out based on quantity
		let slots = perDay;
		while (slots > 0 && next < queue.length) {
			const job = queue[next];
			const pieces = Math.min(job.remaining, slots);

			// First piece number this week, e.g. 14 when 13 were scheduled in earlier weeks
			const total = job.project.quantity || 1;
			const item = week.items.get(job.project.id) || { project: job.project, deadline: job.deadline, from: total - job.remaining + 1, pieces: 0, late: false };

			job.remaining -= pieces;
			slots -= pieces;
			week.used += pieces;
			item.pieces += pieces;
			
			if (day > job.deadline && job.deadline >= today) item.late = true;
			week.items.set(job.project.id, item);

			if (job.remaining === 0) {
				finishDates.set(job.project.id, new Date(day));
				next++;
			}
		}
		day.setDate(day.getDate() + 1);
	}

	//Already overdue projects are reported separately as overdue or late projects
	const overdueProjects = queue.filter(job => job.deadline < today).map(job => job.project);
	const lateProjects = queue
		.filter(job => job.deadline >= today && finishDates.get(job.project.id) > job.deadline)
		.map(job => job.project);

	return {
		weeks: weeks.map(w => ({ ...w, items: [...w.items.values()] })),
		lateProjects,
		overdueProjects,
	};
}

//Decision maker for schedule work, if above the at risk level, then hold off adding anything new
function planWork(activeProjects, today = getToday()) {
	// The plan shown is always at on track pace
	const plan = scheduleWork(activeProjects, CAPACITY_LEVELS[0].perDay, today);

	//On pace level first
	const level = CAPACITY_LEVELS.find((level, i) => {
		const attempt = i === 0 ? plan : scheduleWork(activeProjects, level.perDay, today);
		return attempt.lateProjects.length === 0;
	});

	return {flag: level ? level.flag : "at_risk", ...plan};
}