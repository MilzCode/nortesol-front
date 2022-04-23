import React, { useEffect, useState } from 'react';
import addHttp from '../../utils/add-http';
import VentanaModal from './VentanaModal';

const nombreStorageAnuncioFecha = 'anudate';
interface propsAnuncio {
	nombre?: string;
	descripcion?: string;
	url?: string;
	url_name?: string;
	imagen?: string;
	onClose?: (...props: any) => any;
	saveClose?: boolean;
	id?: string;
	timeCloseMin?: number;
	test?: boolean;
}

/**
 * saveClosed: si es true, al cerrar la ventana
 * no se volvera a mostrar el anuncio por un tiempo determinado
 * (timeCloseMin) default 5 minutos.
 * requiere la id del anuncio.
 */

const Anuncio = ({
	nombre = '',
	imagen = '',
	descripcion,
	url,
	url_name,
	onClose,
	saveClose,
	timeCloseMin = 5,
	id,
	test = false,
}: propsAnuncio) => {
	const [mostrarAnuncio, setMostrarAnuncio] = useState(false);

	useEffect(() => {
		const comprobarMostrarAnuncio = () => {
			if (test) return true;
			try {
				if (timeCloseMin && id) {
					const lastAnuncio = localStorage.getItem(nombreStorageAnuncioFecha);
					let lastAnuncioObj = {} as any;
					if (lastAnuncio) {
						lastAnuncioObj = JSON.parse(lastAnuncio);
						if (lastAnuncioObj.i != id) {
							localStorage.removeItem(nombreStorageAnuncioFecha);
							return true;
						}
						const lastAnuncioDate = lastAnuncioObj.d;
						const nowDate = new Date().getTime();
						const diff = nowDate - lastAnuncioDate;
						const diffMin = Math.round(diff / 60000);
						if (diffMin < timeCloseMin) {
							return false;
						}
						localStorage.removeItem(nombreStorageAnuncioFecha);
					}
					return true;
				}
			} catch (error) {
				return false;
			}
			return false;
		};
		setMostrarAnuncio(comprobarMostrarAnuncio());
	}, []);

	const handdleClose = () => {
		if (saveClose && id) {
			localStorage.setItem(
				nombreStorageAnuncioFecha,
				JSON.stringify({ i: id, d: new Date().getTime() })
			);
		}
		onClose && onClose();
	};
	return (
		<>
			{mostrarAnuncio && (
				<VentanaModal titulo={nombre} onClose={handdleClose}>
					{!!imagen && (
						<>
							<img src={imagen} alt="imagen anuncio" />
							<br />
						</>
					)}
					{!!descripcion && (
						<>
							{descripcion}
							<br />
						</>
					)}
					{url && (
						<a href={addHttp(url)} target="_blank" rel="noreferrer">
							{url_name ? url_name : url}
						</a>
					)}
				</VentanaModal>
			)}
		</>
	);
};

export default Anuncio;
