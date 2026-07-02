
export function capitalizeWords(string) {
	return string
		.split(' ')
		.map(word => 
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(' ');
};

export function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}