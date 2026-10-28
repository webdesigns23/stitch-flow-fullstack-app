import { parseDeadline, getToday } from "./dateTime";

//Pace levels, finished pieces per day (7 days a week)
export const CAPACITY_LEVELS = [
	{ flag: "on_track", perDay: 3 },        // 21 a week
	{ flag: "max_capacity", perDay: 4 },    // 28 a week
	{ flag: "over_capacity", perDay: 5 },   // 35 a week
];
const DAYS_PER_WEEK = 7;

// Schedule every piece, earliest deadline first, in rolling 7-day weeks starting today
// Each day gets the same number of pieces, so calculating per week expectation
export function scheduleWork(activeProjects, perDay, today = getToday()) {
	const queue = activeProjects
		.map(p => ({ project: p, deadline: parseDeadline(p.deadline), remaining: p.quantity || 1 }))
		.sort((a, b) => a.deadline - b.deadline);

	const weeks = [];
	const finishDates = new Map();
	const day = new Date(today);
	let next = 0;

	for (let dayIndex = 0; next < queue.length && dayIndex < 730; dayIndex++) {
		const weekIndex = Math.floor(dayIndex / DAYS_PER_WEEK);
		if (!weeks[weekIndex]) {
			const start = new Date(today);
			start.setDate(today.getDate() + weekIndex * DAYS_PER_WEEK);
			weeks[weekIndex] = { start, used: 0, capacity: perDay * DAYS_PER_WEEK, items: new Map() };
		}
		const week = weeks[weekIndex];

		// Each day has the same number of pieces to give out
		let slots = perDay;
		while (slots > 0 && next < queue.length) {
			const job = queue[next];
			const pieces = Math.min(job.remaining, slots);
			job.remaining -= pieces;
			slots -= pieces;
			week.used += pieces;

			const item = week.items.get(job.project.id) || { project: job.project, deadline: job.deadline, pieces: 0, late: false };
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

	// Already overdue projects are reported separately; "late" means newly at risk
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

// Find the lowest pace that hits every deadline - if above the last level, then hold off adding anything new
export function planWork(activeProjects, today = getToday()) {
	// The plan shown is always at on track pace
	const plan = scheduleWork(activeProjects, CAPACITY_LEVELS[0].perDay, today);

	for (const level of CAPACITY_LEVELS) {
		const attempt = scheduleWork(activeProjects, level.perDay, today);
		if (attempt.lateProjects.length === 0) {
			return { flag: level.flag, ...plan };
		}
	}
	return { flag: "at_risk", ...plan };
}