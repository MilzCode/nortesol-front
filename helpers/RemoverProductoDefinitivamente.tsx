import React from 'react';
import axios from 'axios';
import { APIURL } from '../utils/constantes';

interface RemProdProps {
	id: string;
}

const RemoverProductoDefinitivamente = async ({ id }: RemProdProps) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			return { ok: false, msg: 'no token?' };
		}
		const res = await axios.delete(
			APIURL + 'productos_desabilitados/delete/delete/' + id,
			{
				headers: {
					'x-token': token,
				},
			}
		);
		return res.data;
	} catch (error) {
		return { ok: false, msg: 'Error inesperado, contacta al administrador.' };
	}
};

export default RemoverProductoDefinitivamente;
