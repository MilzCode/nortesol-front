import axios from 'axios';
import { APIURL } from '../utils/constantes';
import Wredirect from './Wredirect';

const RemoverPortada = async (idPortada = '') => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			Wredirect();
			return;
		}
		const res = await axios.delete(APIURL + 'portadas/' + idPortada, {
			headers: {
				'x-token': token,
			},
		});
		return res.data;
	} catch (error) {
		return { ok: false };
	}
};

export default RemoverPortada;
