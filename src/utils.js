const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export function arrayed(str) {
    str = str || "";
    str = str.trim();
    return str.split(';');
}

const items = ["token", "expires", "user"];

export class Auth {
	static login(data) {
		data = {...data, user: JSON.stringify(data.user)}
		items.forEach(key => localStorage.setItem(key, data[key]));
	}

	static logout(token) {
		if (!token || localStorage.getItem("token") === token) {
			items.forEach(key => localStorage.removeItem(key));
		}
	}

	static isLoggedIn() {
		try {
			const token = localStorage.getItem("token");
			const expiry = Number(localStorage.getItem("expires"));
			const expired = expiry < Math.floor(new Date() / 1000);
			if (token && !expired) return true;
		} catch(e) {}
		return false;
	}

	static loggedInUser() {
		try {
			const user = JSON.parse(localStorage.getItem("user"));
			return Auth.isLoggedIn() && user;
		} catch(e) {}
		return null;
	}

	static getToken() {
		const token = localStorage.getItem("token") || '';
		if (token) new Promise(() => {
			try {
				const expiry = localStorage.get("expires");
				if (expiry && Number(expiry) < Math.floor(new Date() / 1000)) {
					Auth.logout(token);
				}
			} catch(e) {}
		})
		return token;
	}
}

export class Api {
	static get(endpoint, headers) {
		return fetch(`${baseURL}${endpoint}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				"Content-Type": "application/json",
				...(headers || {})
			}
		});
	}

	static post(endpoint, body, headers) {
		return fetch(`${baseURL}${endpoint}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				"Content-Type": "application/json",
				...(headers || {})
			},
			body: body
		})
	}
	static delete(endpoint, headers) {
		return fetch(`${baseURL}${endpoint}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				"Content-Type": "application/json",
				...(headers || {})
			}
		})
	}
}

