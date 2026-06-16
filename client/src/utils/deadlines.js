//Deadline CSS range classes
export function getUrgencyClass(daysLeft) {
	if(daysLeft < 0) return "overdue";
	if(daysLeft === 0) return "today";
	if(daysLeft <= 3) return "soon";
	if(daysLeft <= 7) return "week";
	if(daysLeft <= 14) return "early";
	return "coming-up";
}
//Deadline Range Labels
export function getDeadlineLabel(daysLeft, deadline) {
	const dayName = new Date(deadline).toLocaleDateString("en-US", { weekday: "long"});

	if (daysLeft < 0) return `Overdue - ${Math.abs(daysLeft)} day${Math.abs(daysLeft) === 1 ? "" : "s"} late`;
	if(daysLeft === 0) return "Due Today";
	if (daysLeft === 1) return `Due Tomorrow - ${dayName}`; 
	return `Due in ${daysLeft} days - ${dayName}`;
}

//Deadline Week Ranges
export function getWeekRange(daysFromToday) {
	const wkStart = new Date();
	wkStart.setDate(wkStart.getDate() + daysFromToday);

	const wkEnd = new Date(wkStart);
	wkEnd.setDate(wkStart.getDate() + 6)

	const format = (d) => d.toLocaleDateString("en-US", {month: "short", day: "numeric"});

	return `${format(wkStart)} - ${format(wkEnd)}`
}