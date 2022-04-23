import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import formatNumberToprice from '../../utils/formatoPrecio';
import RemoverProductoCarrito from '../../helpers/RemoverProductoCarrito';
import Link from 'next/link';

export const ProductoEnCarrito = ({
	imagen,
	nombre,
	precio = 999999,
	cantidad_disponible = 0,
	cantidadComprarDefault = 1,
	onDelete = () => {},
	onChangeTotal = () => {},
	id = '',
	nombre_url,
}: any) => {
	const [total, setTotal] = useState(9999999);
	const [cantidadComprar, setCantidadComprar] = useState(
		cantidadComprarDefault
	);
	const [deleted, setDeleted] = useState(false);

	useEffect(() => {
		if (cantidadComprar > cantidad_disponible) {
			setCantidadComprar(cantidad_disponible);
		}
		const totalProducto = cantidadComprar * precio;
		setTotal(totalProducto);
		onChangeTotal(totalProducto, id, cantidadComprar);
	}, [cantidadComprar]);

	const handdleCantidadComprar = (cant = 0) => {
		if (cant >= 0) {
			if (cant >= cantidad_disponible) {
				setCantidadComprar(cantidad_disponible);
				return;
			}
			setCantidadComprar(cant);
			return;
		}
	};

	const handdleDelete = () => {
		setCantidadComprar(0);
		RemoverProductoCarrito(id);
		setDeleted(true);
	};

	return (
		<>
			{!deleted && (
				<div className="productoEnCarrito NOSELECT">
					<p className="productoEnCarrito__titulo">
						<Link passHref href={'/producto/' + nombre_url}>
							<a>{nombre ? nombre : <>Cargando...</>}</a>
						</Link>
					</p>
					<div className="productoEnCarrito__container">
						<div className="productoEnCarrito__quitar" onClick={handdleDelete}>
							<i className="fas fa-times-circle">
								<div />
							</i>
							Quitar
						</div>
						<div className="productoEnCarrito__imagen">
							<Image
								src={imagen ? imagen : `/static/img/noimage.jpg`}
								alt="..."
								height="720"
								width="1280"
								objectFit="contain"
							/>
						</div>
						<div className="productoEnCarrito__datos">
							<p className="productoEnCarrito__datosTitulo1">Precio Unitario</p>
							<p className="productoEnCarrito__precio">
								{precio ? formatNumberToprice(precio) : '$999.999'}
							</p>
							<p className="productoEnCarrito__datosTitulo2">Cantidad</p>
							<div className="productoEnCarrito__cantidad">
								<i
									className="far fa-minus-square"
									onClick={() => {
										onDelete(id);
										handdleCantidadComprar(
											cantidadComprar - 1 ? cantidadComprar - 1 : 1
										);
									}}
								>
									<div />
								</i>
								<input
									type="tel"
									max={99}
									maxLength={2}
									value={cantidadComprar}
									onFocus={(e) => {
										e.target.select();
									}}
									onBlur={(e) => {
										if (cantidadComprar == 0) {
											setCantidadComprar(1);
										}
									}}
									onChange={(e) => {
										handdleCantidadComprar(Number(e.target.value));
									}}
								/>
								<i
									className="fas fa-plus-square"
									onClick={() => {
										handdleCantidadComprar(cantidadComprar + 1);
									}}
								>
									<div />
								</i>
							</div>
							<div className="productoEnCarrito__total">
								Total: {formatNumberToprice(total)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
