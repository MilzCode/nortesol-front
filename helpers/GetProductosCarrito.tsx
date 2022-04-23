import { MAXPRODUCTOSCARRITO } from '../utils/constantes';
import GetProductos from './GetProductos';
import Wredirect from './Wredirect';

const GetProductosCarrito = async () => {
	try {
		const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
		if (carrito && carrito.length > MAXPRODUCTOSCARRITO) {
			localStorage.removeItem('carrito');
			Wredirect();
			return;
		}
		const idProductos = carrito.map((pr: any) => pr.p);
		const productos = await GetProductos({
			find_productos_pids: idProductos,
			limit: MAXPRODUCTOSCARRITO,
			send_external_ref: true,
		});
		if (!productos) {
			localStorage.removeItem('carrito');
			return [];
		}
		let productosValidos: any = [];
		const productosCarritoValidos = carrito.filter((pr: any) => {
			let prod = productos.productos.docs.find((p: any) => p.pid === pr.p);
			if (prod && prod.cantidad >= pr.c && pr.c > 0) {
				prod.cantidad_carrito = pr.c;
				productosValidos.push(prod);
				return true;
			}
			return false;
		});
		if (productosCarritoValidos.length === 0) {
			localStorage.removeItem('carrito');
		} else {
			localStorage.setItem('carrito', JSON.stringify(productosCarritoValidos));
		}
		return {
			productos: productosValidos,
			external_reference: productos.external_reference,
		};
	} catch (error) {
		localStorage.removeItem('carrito');
		Wredirect();
	}
};

export default GetProductosCarrito;
