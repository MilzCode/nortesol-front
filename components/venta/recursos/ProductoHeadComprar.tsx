import React, { useState } from 'react';
import BotonFA from '../../general/BotonFAColores1';
import formatoPrecio from '../../../utils/formatoPrecio';
import Link from 'next/link';
import { CalcularDescuento } from '../../../utils/calcular-descuento';

const ProductoHeadComprar = ({
	precio,
	cantidad_disponible = 0,
	onChangeCantidad,
	cantidad_carrito,
	irCarritoUrl,
	onAddCarrito,
	porcentaje_descuento = 0,
}: any) => {
	const cantidadDefault = 1;
	const [cantidadComprar, setCantidadComprar] = useState(cantidadDefault);
	const [disabledCarrito, setDisabledCarrito] = useState(false);
	const handdleCantidadComprar = (cant = 0) => {
		if (cant >= 0) {
			if (cant >= cantidad_disponible) {
				setCantidadComprar(cantidad_disponible);
				onChangeCantidad(cantidad_disponible);
				return;
			}
			setCantidadComprar(cant);
			onChangeCantidad(cant);
			return;
		}
	};
	const descuento = CalcularDescuento(precio, porcentaje_descuento);
	return (
		<div className="productoHeadComprar NOSELECT">
			<p className="productoHeadComprar__titulo1">Precio Unitario</p>
			<p
				className={`productoHeadComprar__precio${
					descuento ? '--anterior' : ''
				}`}
			>
				{formatoPrecio(precio ? precio : 999999)}
			</p>
			<p
				className={`productoHeadComprar__precio${
					descuento ? '--descuento' : '--no'
				}`}
			>
				{formatoPrecio(precio ? precio - descuento : 999999)}
				<small
					className={`productoHeadComprar__porcentaje${
						descuento ? '' : '--no'
					}`}
				>
					&nbsp;{-porcentaje_descuento}%
				</small>
			</p>
			<p className="productoHeadComprar__titulo2">Cantidad</p>
			<div className="productoHeadComprar__cantidad">
				<i
					className="far fa-minus-square"
					onClick={() => {
						handdleCantidadComprar(cantidadComprar - 1);
					}}
				>
					<div />
				</i>
				<input
					type="tel"
					value={cantidadComprar}
					max={99}
					maxLength={2}
					onFocus={(e) => {
						e.target.select();
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
			<br />
			{cantidad_carrito >= 1 && (
				<Link passHref href={irCarritoUrl}>
					<a>
						<BotonFA
							className="productoHeadComprar__boton"
							backgroundColor="#f9423a"
						>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<i className="fas fa-shopping-cart"></i>
							Ir al carrito &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</BotonFA>
					</a>
				</Link>
			)}
			<BotonFA
				className="productoHeadComprar__boton"
				backgroundColor="#ff6a39"
				onClick={() => {
					setDisabledCarrito(true);
					setTimeout(() => {
						onAddCarrito();
						setDisabledCarrito(false);
					}, 150);
				}}
				disabled={disabledCarrito}
			>
				<i className="fas fa-cart-arrow-down"></i>
				Agregar al carrito
			</BotonFA>

			<small className="carrito__totalMensajeFinal">
				Tienes {cantidad_carrito} en el carrito.
				<br />
				Quedan {cantidad_disponible} unidades de este articulo.
			</small>
		</div>
	);
};

export default ProductoHeadComprar;
