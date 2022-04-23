import React from 'react';
import Image from 'next/image';
import Capitalize from '../../utils/capitalize';
import formatNumberToprice from '../../utils/formatoPrecio';
import Link from 'next/link';
import { paths } from '../../utils/constantes';
import { CalcularDescuento } from '../../utils/calcular-descuento';

const ProductoVistaMiniatura = ({
	className,
	nombre,
	precio,
	imagen,
	nombre_url,
	desabilitado = false,
	porcentaje_descuento = 0,
}: any) => {
	return (
		<div className={className}>
			<Link
				passHref
				href={
					nombre_url
						? (!desabilitado ? paths.producto : paths.productoDes) +
						  '/' +
						  nombre_url
						: '#'
				}
			>
				<a>
					<div className={`productoVistaMiniatura NOSELECT`} draggable={false}>
						<div className="productoVistaMiniatura__imagen NOSELECT">
							<Image
								draggable={false}
								src={imagen ?? '/static/img/noimage.jpg'}
								alt="..."
								height="720"
								width="1280"
								objectFit="contain"
							/>
						</div>
						<div className="productoVistaMiniatura__nombre">
							{nombre ? Capitalize(nombre) : 'Sin Titulo'}
						</div>
						<div
							className={`productoVistaMiniatura__precio${
								porcentaje_descuento ? '--descuento' : ''
							} NOSELECT`}
						>
							{precio
								? formatNumberToprice(
										precio - CalcularDescuento(precio, porcentaje_descuento)
								  )
								: '$999.999.999'}
							<span
								className={`productoHeadComprar__porcentaje${
									porcentaje_descuento ? '' : '--no'
								}`}
							>
								&nbsp;{-porcentaje_descuento}%
							</span>
						</div>
						<div className="productoVistaMiniatura__mostrar">
							<i className="fas fa-eye" />
							<span className="NOSELECT">Ver</span>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
};

export default ProductoVistaMiniatura;
