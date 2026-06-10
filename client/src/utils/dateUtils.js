
//formats date from y/m/d to month day, year
export function formatDate(dateString) {
  try {
    const [month, day, year] = dateString.split("/");
    const dateObj = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(dateObj);
  } catch (error) {
    return dateString; 
  }
};

//parse deadline date to compare
export function parseDeadline(project_deadline) {
  const [month, day, year] = project_deadline.split("/");
  const deadlineDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  deadlineDate.setHours(0, 0, 0, 0);
  return deadlineDate;
}

//gets todays date
export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}