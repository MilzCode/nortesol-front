import axios from 'axios';
import { APIURL } from '../utils/constantes';
import Wredirect from './Wredirect';

const RemoverAnuncio = async (idAnuncio = '') => {
	try {
		if (!idAnuncio) {
			return { ok: false, msg: 'no hay id' };
		}
		const token = localStorage.getItem('tken');
		if (!token) {
			Wredirect();
			return;
		}
		const res = await axios.delete(APIURL + 'anuncios/' + idAnuncio, {
			headers: {
				'x-token': token,
			},
		});
		return res.data;
	} catch (error) {
		return { ok: false };
	}
};

export default RemoverAnuncio;
