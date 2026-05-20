const API_URL = import.meta.env.VITE_API_URL;

//Headers helper function
function getHeaders() {
	const token = localStorage.getItem("token");
	return {
		"Content-Type": "application/json",
		Accept: "application/json",
		...(token ? {Authorization: `Bearer ${token}`}: {})
	};
};

//Create a new pattern
export function createPattern(newPattern) {
	return fetch(`${API_URL}/patterns`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(newPattern),
		});
}

//Lists all Patterns promise
export function fetchPatterns() {
	return fetch(`${API_URL}/patterns`, {
		headers: getHeaders()
	});
};

//Delete Pattern promise
export function deletePatternById(pattern_id) {
	return fetch(`${API_URL}/patterns/${pattern_id}`, {
		method: "DELETE",
		headers: getHeaders()
	});
};

//Update Pattern promise
export function updatePatternById(pattern_id, updates) {
	return fetch(`${API_URL}/patterns/${pattern_id}`, {
		method: "PATCH",
		headers: getHeaders(),
		body: JSON.stringify(updates),
		});
};