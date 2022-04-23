import { APIURL } from '../utils/constantes';
const DoLogin = async (email: string, password: string) => {
	const response = await fetch(APIURL + 'auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
	const res = await response.json();
	if (res.ok) {
		localStorage.setItem('tken', res.token);
	}
	return res;
};

const DoLoginGoogle = async (token: string) => {
	try {
		if (!token) {
			return {
				ok: false,
				message: 'Token is required',
			};
		}
		const response = await fetch(APIURL + 'auth/google', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'g-token': token,
			},
		});
		const res = await response.json();
		if (res.ok) {
			localStorage.setItem('tken', res.token);
		}
		return res;
	} catch (error) {
		return {
			ok: false,
			message: 'Error',
		};
	}
};
const DoLoginFacebook = async (token: string) => {
	try {
		if (!token) {
			return {
				ok: false,
				message: 'Token is required',
			};
		}
		const response = await fetch(APIURL + 'auth/facebook', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'f-token': token,
			},
		});
		const res = await response.json();
		if (res.ok) {
			localStorage.setItem('tken', res.token);
		}

		return res;
	} catch (error) {
		return {
			ok: false,
			message: 'Error',
		};
	}
};

export default DoLogin;
export { DoLoginGoogle, DoLoginFacebook };
