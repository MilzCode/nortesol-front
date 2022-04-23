import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Capitalize from '../../utils/capitalize';
import formatNumberToprice from '../../utils/formatoPrecio';

const PortadaMiniatura = ({
	className,
	nombre,
	imagen,
	descripcion,
	onDelete,
	id,
}: any) => {
	const router = useRouter();

	return (
		<div className={`portadaMiniatura ${className}`} onClick={() => {}}>
			<div className="portadaMiniatura__imagen NOSELECT">
				<Image
					src={imagen ?? '/static/img/noimage.jpg'}
					alt="..."
					height="720"
					width="1280"
					objectFit="contain"
				/>
			</div>
			<div className="portadaMiniatura__nombre">
				{nombre ? Capitalize(nombre) : 'Sin Nombre'}
			</div>

			<div
				className="portadaMiniatura__quitar"
				onClick={() => {
					onDelete(id);
				}}
			>
				<i className="fas fa-eye" />
				<span className="NOSELECT">Quitar</span>
			</div>
		</div>
	);
};

export default PortadaMiniatura;
