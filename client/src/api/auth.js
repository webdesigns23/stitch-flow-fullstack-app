const API_URL = import.meta.env.VITE_API_URL;

// Sign up a user
export function signup(email, password, passwordConfirmation, displayName) {
	return fetch(`${API_URL}/signup`, {
		method: "POST",
		headers:{"Content-Type": "application/json"},
		body:JSON.stringify({
					email, 
					password, 
					password_confirmation: passwordConfirmation, display_name:displayName,
		})
	});
}

// Login a user
export function login(email, password) {
	return fetch(`${API_URL}/login`, {
		method: "POST",
		headers:{"Content-Type": "application/json"},
		body:JSON.stringify({
			email: email.trim(), 
			password
		})
	});
}

// Login a guest user
export function guestLogin() {
	return fetch(`${API_URL}/guest_login`, {
		method: "POST",
	})
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

