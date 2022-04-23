import { APIURL } from '../utils/constantes';

/**
 * Este componente recibe elementos de registro y realiza el registro,
 * si todo va bien retorna true
 * 
 * datos ej::
 *     "nombre": "Juan3",
    "rut": "22222222-2",
    "email": "juan3@mail.com",
    "celular": "123456789",
    "region": "Region",
    "ciudad": "Ciudad",
    "direccion": "Direccion",
    "password": "12345678"
 * 
 * 
 * @returns {boolean}
 * @memberof UseRegister
 * @param nombre - string 
 * @param rut - string
 * @param email -string
 * @param celular - number
 * @param region - string
 * @param ciudad - string
 * @param direccion - string
 * @param password - string
 */

const DoRegister = async (
	nombre: string,
	rut: string,
	email: string,
	celular: number,
	region: string,
	ciudad: string,
	direccion: string,
	password: string
) => {
	const data = {
		nombre,
		rut,
		email,
		celular,
		region,
		ciudad,
		direccion,
		password,
	};

	try {
		const response = await fetch(APIURL + 'usuarios', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const res = await response.json();
		return res;
	} catch (error) {
		return { errors: 'Error conexion con base de datos' };
	}
};

export default DoRegister;
