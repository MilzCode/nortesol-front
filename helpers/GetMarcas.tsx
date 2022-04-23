import { APIURL } from '../utils/constantes';
const GetMarcas = async () => {
	try {
		const response = await fetch(APIURL + 'marcas');
		const responseData = await response.json();
		return responseData.marcas;
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado, contacta al administrador',
		};
	}
};

export default GetMarcas;
