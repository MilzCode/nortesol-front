import React, { useEffect, useState } from 'react';
import GetPortadas from '../../../helpers/GetPortadas';
import Volver from '../../../components/general/Volver';
import PortadaMiniatura from '../../../components/nortesoladm/PortadaMiniatura';
import RemoverPortada from '../../../helpers/RemoverPortada';
import Wredirect from '../../../helpers/Wredirect';

const Removeportada = ({ me, auth }: any) => {
	const [portadas, setPortadas] = useState([]);
	const handdleDelete = (id: '') => {
		if (!id) {
			return;
		}
		RemoverPortada(id)
			.then((res) => {
				if (res.ok) {
					Wredirect('/user/nortesoladm/removeportada');
					return;
				}
				alert('Hubo un problema contacta al administrador*');
			})
			.catch((er) => {
				alert('Hubo un problema contacta al administrador');
			});
	};

	useEffect(() => {
		if (!me.admin) return;
		GetPortadas()
			.then((res) => {
				setPortadas(res.portadas);
			})
			.catch();
	}, []);
	if (!me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			<Volver />
			<h1 className="producto__titulo">Remover Portadas</h1>
			<br />
			<div className="index__productos">
				{portadas &&
					portadas.map((p: any, i: any) => (
						<PortadaMiniatura
							key={i}
							nombre={p.nombre}
							imagen={p.imagen}
							id={p.id}
							onDelete={(id: any) => {
								handdleDelete(id);
							}}
						/>
					))}

				{portadas && portadas.length == 0 && (
					<>
						<p>No hay portadas...</p>
					</>
				)}
			</div>
		</>
	);
};

export default Removeportada;
