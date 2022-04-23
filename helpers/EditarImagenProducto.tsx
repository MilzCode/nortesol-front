import { APIURL } from '../utils/constantes';

interface ActualizarImagenProps {
	imagenes: any;
	id: string;
}

const EditarImagenProducto = async (
	{ imagenes, id }: ActualizarImagenProps,
	desabilitado = false
) => {
	let formData = new FormData();
	for (let i = 0; i < imagenes.length; i++) {
		let file = imagenes.item(i);
		formData.append('files[]', file);
	}
	const token = localStorage.getItem('tken');
	if (!token) {
		return {
			ok: false,
			msg: 'No hay token?',
		};
	}
	const res = await fetch(APIURL + 'images/' + id, {
		method: 'PUT',
		headers: {
			'x-token': token,
			des: desabilitado ? 'des' : '',
		},
		body: formData,
	});
	const data = await res.json();
	return data;
};

export default EditarImagenProducto;
