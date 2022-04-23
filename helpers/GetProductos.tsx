import axios from 'axios';
import { APIURL } from '../utils/constantes';
import Wredirect from './Wredirect';

interface filtroProps {
	nombre_url?: string;
	id?: string;
	///
	busqueda?: string;
	cantidad?: number;
	categorias?: Array<string>;
	descuento_min?: number;
	descuento_max?: number;
	marcas?: Array<string>;
	precio_min?: number;
	precio_max?: number;
	relevancia?: number;
	page?: number;
	limit?: number;
	find_productos_pids?: Array<string>;
	sortQuery?: {
		field: string;
		sort: string | number;
	};
	send_external_ref?: boolean;
}

const GetProductos = async (
	{ ...props }: filtroProps,
	desabilitados = false
) => {
	try {
		const urlApiProductos = !desabilitados
			? 'productos'
			: 'productos_desabilitados';
		const Token = localStorage.getItem('tken');
		if (!Token && desabilitados) {
			return { ok: false };
		}
		const response = await axios.get(APIURL + urlApiProductos, {
			params: {
				...props,
			},
			headers: {
				'x-token': Token ?? '',
			},
		});
		const data = response.data;
		return data;
	} catch (error) {
		Wredirect();
		//detalle producto solo existira cuando se hace una busqueda por id
		return { ok: false, productos: { totalDocs: 0 }, detalle_producto: null };
	}
};

export default GetProductos;
