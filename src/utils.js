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

	static logout() {
		items.forEach(key => localStorage.removeItem(key));
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
}