import { APIURL } from '../utils/constantes';
import EditarImagenProducto from './EditarImagenProducto';

interface productoProps {
	descripcion?: string | any;
	nombre: string;
	precio: number;
	categorias: Array<string>;
	cantidad: number;
	marca?: string;
	imagenes?: any; //fillist
	relevancia?: number;
	porcentaje_descuento?: number;
}

const CrearProducto = async (
	{ ...data }: productoProps,
	desabilitado = false
) => {
	try {
		if (!data.imagenes || data.imagenes.length === 0) {
			return {
				ok: false,
				msg: 'Hace falta almenos 1 imagen',
				type: 'minimagen',
			};
		}

		const token = localStorage.getItem('tken');
		if (!token) {
			return {
				ok: false,
				msg: 'No hay token?',
			};
		}
		const urlApiProductos = !desabilitado
			? 'productos'
			: 'productos_desabilitados';

		const response = await fetch(APIURL + urlApiProductos, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-token': token,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const data = await response.json();
			const msg = data.msg;

			return {
				ok: false,
				msg: msg ?? 'Error al crear el producto contacta al administrador*',
			};
		}

		const responseData = await response.json();

		const idProducto = responseData.producto.id;
		const actualizarImgRes = await EditarImagenProducto(
			{
				imagenes: data.imagenes,
				id: idProducto,
			},
			desabilitado
		);
		let newUrl = '';
		if (responseData.ok) {
			newUrl = responseData.producto.nombre_url;
		}
		if (!actualizarImgRes.ok && responseData.ok) {
			return {
				ok: true,
				msg: 'Se subio el producto, pero no se pudo subir imagen.',
				type: 'noimage',
				newUrl,
			};
		} else if (responseData.ok) {
			return { ok: true, msg: 'Subido con exito', newUrl };
		}
		return { ok: false, msg: responseData.msg };
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado, contacta al administrador',
		};
	}
};

export default CrearProducto;
