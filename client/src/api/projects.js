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

//Create a new project
export function createProject(newProject) {
	return fetch(`${API_URL}/projects`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(newProject),
		});
}

//Lists all Projects promise
export function fetchProjects() {
	return fetch(`${API_URL}/projects`, {
		headers: getHeaders()
	});
};

//Delete Project promise
export function deleteProjectById(project_id) {
	return fetch(`${API_URL}/projects/${project_id}`, {
		method: "DELETE",
		headers: getHeaders()
	});
};

//Update Project promise
export function updateProjectById(project_id, updates) {
	return fetch(`${API_URL}/projects/${project_id}`, {
		method: "PATCH",
		headers: getHeaders(),
		body: JSON.stringify(updates),
		});
};







