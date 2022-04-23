import axios from 'axios';
import { APIURL } from '../utils/constantes';

const Des_HabilitarProducto = async ({ id }: any, desabilitado = false) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			return { ok: false };
		}
		if (!id) {
			return { ok: false, msg: 'Falta id' };
		}
		const urlApiProductos = !desabilitado
			? 'productos'
			: 'productos_desabilitados';
		const response = await axios.delete(APIURL + urlApiProductos + '/' + id, {
			headers: {
				'x-token': token,
			},
		});
		return response.data;
	} catch (error) {
		return { ok: false, msg: 'Hubo un problema contacta al administrador**.' };
	}
};

export default Des_HabilitarProducto;
