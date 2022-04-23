import Wredirect from './Wredirect';
const RemoverProductoCarrito = (id = '') => {
	try {
		const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
		const newCarrito = carrito.filter((pr: any) => pr.p != id);
		localStorage.setItem('carrito', JSON.stringify(newCarrito));
	} catch (error) {
		localStorage.removeItem('carrito');
		Wredirect();
	}
};

export default RemoverProductoCarrito;
