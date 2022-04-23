import { MAXPRODUCTOSCARRITO } from '../utils/constantes';
import Wredirect from './Wredirect';

/**
 * @param p - nombre_url del producto
 * @param c - cantidad
 * @param maxc - cantidad disponible
 */
const PonerProductoCarrito = ({ p = '', c = 0, maxc = 0, carritoCant = 0 }) => {
	try {
		let cantidad = 0;
		const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
		const nuevoProducto = { p, c };
		//producto es un puntero hacia el producto del carrito.
		let producto = carrito.find((pr: any) => pr.p === nuevoProducto.p);
		if (!producto) {
			if (carrito.length >= MAXPRODUCTOSCARRITO) {
				return -1;
			}
			if (c == 0) {
				return;
			}
			if (c > maxc) {
				nuevoProducto.c = maxc;
			}
			cantidad = nuevoProducto.c;
			carrito.unshift(nuevoProducto);
		} else {
			producto.c = producto.c + c;
			if (producto.c > maxc) {
				producto.c = maxc;
			}
			cantidad = producto.c;
		}

		localStorage.setItem('carrito', JSON.stringify(carrito));
		return cantidad;
	} catch (error) {
		localStorage.removeItem('carrito');
		Wredirect();
	}
};

export default PonerProductoCarrito;
