import React from 'react';
import Wredirect from './Wredirect';

const GetCantidadProductoCarrito = (id = '') => {
	try {
		const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
		const producto = carrito.find((pr: any) => pr.p === id);
		if (producto) {
			return producto.c;
		}
		return 0;
	} catch (error) {
		localStorage.removeItem('carrito');
		Wredirect();
	}
};

export default GetCantidadProductoCarrito;
