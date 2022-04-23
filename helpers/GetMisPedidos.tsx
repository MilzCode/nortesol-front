import React from 'react';
import axios from 'axios';
import { APIURL } from '../utils/constantes';

interface Props {
	idUsuario: string;
	page?: number;
	limit?: number;
}

const GetMisPedidos = async ({ idUsuario, page, limit }: Props) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			return {
				ok: false,
				msg: 'No se encontro token',
			};
		}

		const resp = await axios.get(APIURL + 'pedidos/mis-pedidos/' + idUsuario, {
			headers: {
				'content-type': 'application/json',
				'x-token': token,
			},
			params: {
				page,
				limit,
			},
		});
		return resp.data;
	} catch (error) {
		return {
			ok: false,
			msg: 'Error al obtener los pedidos',
		};
	}
};

export default GetMisPedidos;
