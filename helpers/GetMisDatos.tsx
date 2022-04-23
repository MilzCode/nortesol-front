import { APIURL } from '../utils/constantes';
import JWT from 'jsonwebtoken';

const GetMisDatos = async (miId: string) => {
	const token = localStorage.getItem('tken');

	if (!token || !miId) {
		return null;
	}

	const response = await fetch(APIURL + 'usuarios/' + miId, {
		method: 'GET',
		headers: {
			['x-token']: `${token}`,
			'Content-Type': 'application/json',
		},
	});
	const { admin, ...data } = await response.json();
	if (data.ok) {
		return Object.assign({ ...data.usuario }, admin && { admin: true });
	}
	return null;
};

export default GetMisDatos;
