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
	descuento?: number;
	relevancia?: number;
	idProd: any;
	porcentaje_descuento?: number;
}

const EditarProducto = async (
	{
		nombre,
		precio,
		descripcion,
		categorias,
		cantidad,
		marca,
		imagenes,
		idProd,
		relevancia,
		porcentaje_descuento
	}: productoProps,
	desabilitado = false
) => {
	try {
		const dataFetch = {
			nombre,
			precio,
			descripcion,
			categorias,
			cantidad,
			marca,
			relevancia,
			porcentaje_descuento
		};
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

		const response: any = await fetch(APIURL + urlApiProductos + '/' + idProd, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-token': token,
			},
			body: JSON.stringify(dataFetch),
		});

		if (!response.ok) {
			const msg = (await response.json()).msg;

			return {
				ok: false,
				msg: msg ?? 'Error al editar el producto contacta al administrador*',
			};
		}

		const responseData = await response.json();
		const idProducto: string = responseData.producto.id;
		const newUrl = responseData.producto.nombre_url;
		//no se requiere actualizar imagen
		if (!imagenes || imagenes.length === 0) {
			return { ok: true, msg: 'Actualizado con exito', newUrl };
		}
		const actualizarImgRes = await EditarImagenProducto(
			{
				imagenes,
				id: idProducto,
			},
			desabilitado
		);
		if (!actualizarImgRes.ok && responseData.ok) {
			return {
				ok: true,
				msg: 'Se actualizo el producto, pero no se pudo subir imagen.',
				type: 'noimage',
				newUrl,
			};
		} else if (responseData.ok) {
			return { ok: true, msg: 'Actualizado con exito*', newUrl };
		}
		return { ok: false, msg: responseData.msg };
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado, contacta al administrador',
		};
	}
};

export default EditarProducto;
