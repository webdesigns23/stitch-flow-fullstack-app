//Date/time helpers
export {
  formatFullDate, //formats date from y/m/d to May 23, 2016
  formatWeekday, //formats to weekday name Mon
  formatDate, //formats to short date May 23
  parseDeadline, //parse deadline date to compare
  getToday, //gets todays date
  getGreeting, //dashboard greeting depending on time
};



function formatFullDate(dateString) {
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

function formatWeekday(dateString) {
  try {
    const [month, day, year] = dateString.split("/");
    const dateObj = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(dateObj);
  } catch {
    return dateString;
  }
}

function formatDate(dateString) {
  try {
    const [month, day, year] = dateString.split("/");
    const dateObj = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(dateObj);
  } catch {
    return dateString;
  }
}

function parseDeadline(project_deadline) {
  const [month, day, year] = project_deadline.split("/");
  const deadlineDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  deadlineDate.setHours(0, 0, 0, 0);
  return deadlineDate;
}

function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}