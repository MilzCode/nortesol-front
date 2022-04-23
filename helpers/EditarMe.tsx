import React from 'react';
import { APIURL } from '../utils/constantes';

interface editMeProps {
	miId: string;
	password_original?: string;
	nombre?: string;
	rut?: string;
	celular?: number;
	region?: string;
	ciudad?: string;
	direccion?: string;
	password?: string;
	admin?: boolean;
}

//TODO: Este componente puede recibir parametros opcionales
const EditarMe = async ({ ...data }: editMeProps) => {
	const token = localStorage.getItem('tken');
	if (!token || !data.miId) {
		return { errors: 'No existe token' };
	}

	try {
		const ruta = data.admin
			? `${APIURL}usuarios/withpass/${data.miId}`
			: `${APIURL}usuarios/${data.miId}`;

		const response = await fetch(ruta, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-token': token,
			},
			body: JSON.stringify(data),
		});
		const res = await response.json();

		return res;
	} catch (error) {
		return { errors: 'Error conexion con base de datos' };
	}
};

export default EditarMe;
