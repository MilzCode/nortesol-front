/**
 * Wredirect es un metodo de redireccion que asegura que el objeto window exista.
 */
const Wredirect = (url = '/', href = false) => {
	if (typeof window !== 'undefined') {
		if (href) {
			window.location.href = url;
		} else {
			window.location.replace(url);
		}
	}
	return null;
};

export default Wredirect;
