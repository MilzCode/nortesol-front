import { APIURL } from '../utils/constantes';

const GetCategorias = async () => {
	try {
		const response = await fetch(APIURL + 'categorias');
		const responseData = await response.json();
		return responseData.categorias;
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado, contacta al administrador',
		};
	}
};

export default GetCategorias;
