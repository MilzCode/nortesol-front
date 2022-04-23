// export const APIURL = 'http://localhost:8080/api/';
export const APIURL = 'https://nortesol.herokuapp.com/';
export const DEFAULTNOPASSWORD = '*8979ca3276d.965b/91ff0.68c325af2853*';
//Algunos nombres como "cuadernozaza" pueden coincidir con un mongo id valido, esta llave es para verificar que es un string y no un mongo id.
export const NOMONGOIDKEY_DONOTCHANGE = 'NAME---';
export const SEPARADOR = ',';
export const MAXPRODUCTOSCARRITO = 30;
export const MAXCATEGORIASPORPRODUCTO = 3;
//FILTER SEARCH OPTIONS
export const MAXCATEGORIASFILTER = 3;
export const MAXMARCASFILTER = 3;
export const paths = {
	searchDesabilitados: '/user/nortesoladm/searchdesabilitados',
	editarProducto: '/user/nortesoladm/editarproducto',
	editarProductoDes: '/user/nortesoladm/searchdesabilitados/productodes/editar',
	productoDes: '/user/nortesoladm/searchdesabilitados/productodes',
	producto: '/producto',
	addProduct: '/user/nortesoladm/addproduct',
};
