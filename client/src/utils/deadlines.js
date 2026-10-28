//Deadline helpers
export {
	getUrgencyClass, //Deadline CSS range classes
	getDeadlineLabel, //Deadline Range Labels
	getWeekRange, //Deadline Week Ranges Oct 4 - Oct 10 
};


function getUrgencyClass(daysLeft) {
	if(daysLeft < 0) return "overdue";
	if(daysLeft === 0) return "today";
	if(daysLeft <= 3) return "soon";
	if(daysLeft <= 7) return "week";
	if(daysLeft <= 14) return "early";
	return "coming-up";
}

function getDeadlineLabel(daysLeft) {
	if (daysLeft < -1) return `Overdue by ${Math.abs(daysLeft)} days`;
	if (daysLeft === -1) return "Due Yesterday";
	if(daysLeft === 0) return "Due Today";
	if (daysLeft === 1) return "Due Tomorrow"; 
	return `Due in ${daysLeft} days`;
}

function getWeekRange(wkStart) {
	const wkEnd = new Date(wkStart);
	wkEnd.setDate(wkStart.getDate() + 6);

	const format = (d) => d.toLocaleDateString("en-US", {month: "short", day: "numeric"});
	return `${format(wkStart)} - ${format(wkEnd)}`
}