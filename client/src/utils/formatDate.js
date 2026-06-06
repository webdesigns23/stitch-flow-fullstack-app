
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