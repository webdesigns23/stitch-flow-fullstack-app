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

//List Project Details by Id
export async function fetchProjectById(id) {
	const token = localStorage.getItem("token");
	const response = await fetch(`${API_URL}/projects/${id}`, {
		headers: getHeaders(),
	});
	if (!response.ok) throw new Error(`HTTP error!: ${response.status}`);
	return response.json();
}

/* Project Images */
//Header for formData
function getAuthHeader() {
	const token = localStorage.getItem("token");
	return {
		Accept: "application/json",
		...(token ? {Authorization: `Bearer ${token}`}: {})
	};
};

//Upload Image to a project
export function uploadProjectImage(project_id, formData) {
	return fetch(`${API_URL}/projects/${project_id}/images`, {
		method: "POST",
		headers: getAuthHeader(),
		body: formData,
		});
}


//Delete ProjectImage
export function deleteProjectImage(project_id, image_id) {
	return fetch(`${API_URL}/projects/${project_id}/images/${image_id}`, {
		method: "DELETE",
		headers: getHeaders()
	});
};

//Update ProjectImage Image_Type or Notes 
export function updateProjectImage(project_id, image_id, updates) {
	return fetch(`${API_URL}/projects/${project_id}/images/${image_id}`, {
		method: "PATCH",
		headers: getHeaders(),
		body: JSON.stringify(updates),
	});
};



