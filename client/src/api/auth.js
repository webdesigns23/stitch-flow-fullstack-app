const API_URL = import.meta.env.VITE_API_URL;

// Sign up a user
export function signup(username, password, passwordConfirmation, displayName) {
	return fetch(`${API_URL}/signup`, {
		method: "POST",
		headers:{"Content-Type": "application/json"},
		body:JSON.stringify({
					username, 
					password, 
					password_confirmation: passwordConfirmation, display_name:displayName,
		})
	});
}

// Login a user
export function login(username, password) {
	return fetch(`${API_URL}/login`, {
		method: "POST",
		headers:{"Content-Type": "application/json"},
		body:JSON.stringify({
			username: username.trim(), 
			password
		})
	});
}

// Check if a user is authorized
export function me() {
	const token = localStorage.getItem("token");
	if (!token) {
		return Promise.resolve(null);
	}
	return fetch(`${API_URL}/me` ,{
		  headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		  },
	});
}

