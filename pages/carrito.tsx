import React, { useEffect } from 'react';
import BotonFAColores1 from '../components/general/BotonFAColores1';
import VentanaModal from '../components/general/VentanaModal';
import Volver from '../components/general/Volver';
import { ProductoEnCarrito } from '../components/venta/ProductoEnCarrito';
import GetProductosCarrito from '../helpers/GetProductosCarrito';
import NuevoPagoMercadoPago from '../helpers/NuevoPagoMercadoPago';
import Link from 'next/link';

import Capitalize from '../utils/capitalize';
import formatNumberToprice from '../utils/formatoPrecio';
import { CalcularDescuento } from '../utils/calcular-descuento';

const Carrito = ({ me }: any) => {
	const [domicilio, setDomicilio] = React.useState(false);
	const [productos, setProductos] = React.useState([]);
	const [total, setTotal] = React.useState(9999999);
	const [modalNologin, setModalNologin] = React.useState(false);
	const [modalNoDataUser, setModalNoDataUser] = React.useState(false);
	const [modalNoDir, setModalNoDir] = React.useState(false);
	const [pay, setPay] = React.useState(false);
	const [stopBuy, setStopBuy] = React.useState(false);

	const [productosTotalId, setProductosTotalId] = React.useState<any>({});
	let productosTotalIdCopy = {};

	const handdleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!me) {
			setModalNologin(true);
			return;
		}
		if (
			me &&
			(me.nombre === 'Sin nombre' ||
				me.celular === '912345678' ||
				me.rut === '00.000.000-0')
		) {
			setModalNoDataUser(true);
			return;
		}
		if (
			domicilio &&
			me &&
			(me.direccion === 'direccion' || me.region === 'region')
		) {
			setModalNoDir(true);
			return;
		}

		setPay(true);
		//disable boton
		const boton = document.getElementById('button-pay');
		boton && boton.setAttribute('disabled', 'true');
		const resp = await NuevoPagoMercadoPago();
		if (resp.ok) {
			window.location.href = resp.init_point;
			return;
		}
		alert(resp.msg);
	};
	useEffect(() => {
		GetProductosCarrito()
			.then((p) => {
				//@ts-ignore
				if (!p?.productos) {
					return;
				}
				//@ts-ignore
				setProductos(p.productos);
				//@ts-ignore
				if (p.external_reference) {
					//@ts-ignore
					setStopBuy(p.external_reference.stopbuy);
				}
			})
			.catch();
	}, []);
	useEffect(() => {
		let totalesPrecios = 0;
		const newCarrito = Object.entries(productosTotalId).map(
			(producto: Array<any>) => {
				totalesPrecios += producto[1].total;
				return { p: producto[0], c: producto[1].cantidad };
			}
		);
		localStorage.setItem('carrito', JSON.stringify(newCarrito));
		setTotal(totalesPrecios);
	}, [productosTotalId]);

	return (
		<>
			<div className="carrito">
				<Volver />
				{modalNologin && (
					<VentanaModal
						titulo="No estás Loguead@"
						onClose={() => {
							setModalNologin(false);
						}}
					>
						¡HOLA! Puedes ingresar fácilmente para realizar tu compra haciendo
						clic acá :D
						<br />
						<Link href="/login" passHref>
							<a>
								<BotonFAColores1 backgroundColor="#00a5df">
									Ingresar
								</BotonFAColores1>
							</a>
						</Link>
					</VentanaModal>
				)}
				{modalNoDataUser && (
					<VentanaModal
						titulo="Sin datos de contacto"
						onClose={() => {
							setModalNoDataUser(false);
						}}
					>
						¡HOLA! necesitamos tus datos de contacto para poder realizar la
						compra
						<br />
						<Link href="/user/edit" passHref>
							<a>
								<BotonFAColores1 backgroundColor="#00a5df">
									Revisar mis datos
								</BotonFAColores1>
							</a>
						</Link>
					</VentanaModal>
				)}
				{modalNoDir && (
					<VentanaModal
						titulo="Sin dirección"
						onClose={() => {
							setModalNoDir(false);
						}}
					>
						¡HOLA! necesitamos tu dirección para poder enviarte la compra :D
						<br />
						<Link href="/user/edit-address" passHref>
							<a>
								<BotonFAColores1 backgroundColor="#00a5df">
									Revisar mi dirección
								</BotonFAColores1>
							</a>
						</Link>
					</VentanaModal>
				)}
				<h1>CARRITO DE COMPRA</h1>
				<div className="carrito__container">
					{productos && productos.length > 0 && (
						<div className="carrito__productos">
							<h3 className="carrito__msgProductos">Producto/s</h3>
							{productos.map((p: any, i: any) => (
								<ProductoEnCarrito
									key={i}
									imagen={p.imagen}
									nombre={Capitalize(p.nombre)}
									precio={
										p.precio -
										CalcularDescuento(p.precio, p.porcentaje_descuento)
									}
									cantidad_disponible={p.cantidad}
									cantidadComprarDefault={p.cantidad_carrito}
									id={p.pid}
									nombre_url={p.nombre_url}
									onChangeTotal={(
										total: number,
										id: string,
										cantidad: number
									) => {
										//@ts-ignore
										productosTotalIdCopy[id] = { total, cantidad };
										setProductosTotalId({
											...productosTotalId,
											...productosTotalIdCopy,
										});
									}}
								/>
							))}
							<br />
						</div>
					)}
					<div className="carrito__totalContainer NOSELECT">
						<br />
						<form className="carrito__total" onSubmit={handdleSubmit}>
							<h3 className="carrito__totalTitulo">Total de Productos</h3>
							<p className="carrito__totalPrecio">
								{formatNumberToprice(total)}
							</p>
							<div>
								<div className="carrito__retiroTienda">
									<input
										type="radio"
										id="tienda"
										name="retiro"
										value="tienda"
										defaultChecked
										onChange={() => {
											setDomicilio(!domicilio);
										}}
									/>
									<label htmlFor="tienda">Retiro en tienda</label>
								</div>
								{/* <div className="carrito__retiroDomicilio">
									<input
										type="radio"
										id="domicilio"
										name="retiro"
										value="domicilio"
										onChange={() => {
											setDomicilio(!domicilio);
										}}
										disabled
									/>
									<label htmlFor="domicilio">Envio a domicilio</label>
								</div> */}
								{/* <div className="carrito__retiroDomicilioSelect">
									{domicilio && (
										<>
											<p className="carrito__totalMensajeFinal">
												Debe ingresar para esta opción
											</p>
										</>
									)}
								</div> */}
							</div>
							{/* si esta disponible el domicilio O no es envio a domicilio se despliega el boton */}

							<BotonFAColores1 disabled={pay || stopBuy} type="submit">
								<i className="fas fa-shopping-bag"></i>
								Comprar
							</BotonFAColores1>
							{stopBuy && (
								<>
									<small className="carrito__totalMensajeFinal">
										&nbsp;&nbsp;Actualmente no estamos atendiendo pedidos
										online.&nbsp;&nbsp;
									</small>
									<small className="carrito__totalMensajeFinal">
										&nbsp;&nbsp;Puede comunicarse con nosotros en la sección
										de&nbsp;
										<Link href="/contacto" passHref>
											<a className="LINK">Contacto.</a>
										</Link>
										&nbsp;&nbsp;
									</small>
								</>
							)}

							{/* Si el domicilio no esta disponible y es envio a domicilio no se despliega boton, y despliega mensaje */}
							{/* {domicilioNoDisponible && domicilio && (
								<p className="carrito__totalDomicilioNoMsg">
									Actualmente no enviamos a esa ubicación. Para mayor
									información, puede contactarnos por whatsapp o correo.
								</p>
							)} */}

							<small className="carrito__totalMensajeFinal">
								Puede que se soliciten más datos para realizar la entrega.
								<br />
								<Link href="/contacto" passHref>
									<a className="LINK">Términos y condiciones.</a>
								</Link>
							</small>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Carrito;
