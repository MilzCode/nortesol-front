import { APIURL } from '../utils/constantes';

const CrearMarca = async ({ nombre = '' }) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			return {
				ok: false,
				msg: 'No hay token?',
			};
		}

		const response = await fetch(APIURL + 'marcas', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-token': token,
			},
			body: JSON.stringify({ nombre }),
		});
		const responseData = await response.json();
		if (!response.ok) {
			return {
				ok: false,
				msg: responseData.msg,
			};
		}
		return {
			ok: true,
			msg: 'Marca creada',
		};
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado al crear marca, contacta al administrador',
		};
	}
};

export default CrearMarca;
