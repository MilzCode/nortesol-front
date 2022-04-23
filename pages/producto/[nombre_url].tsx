import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import Volver from '../../components/general/Volver';
import ProductoHead from '../../components/venta/ProductoHead';
import ProductoBody from '../../components/venta/ProductoBody';
import ProductoRelacionados from '../../components/venta/ProductoRelacionados';
import EditarProductoBTN from '../../components/general/EditarProductoBTN';
import Capitalize from '../../utils/capitalize';
import PonerProductoCarrito from '../../helpers/PonerProductoCarrito';
import GetCantidadProductoCarrito from '../../helpers/GetCantidadProductoCarrito';
import VentanaModal from '../../components/general/VentanaModal';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import GetProductos from '../../helpers/GetProductos';
import Link from 'next/link';
import Wredirect from '../../helpers/Wredirect';

const Producto = ({ me }: any) => {
	const router = useRouter();
	const { nombre_url } = router.query;

	const [producto, setProducto] = useState<any>(false);
	const [cantidad, setCantidad] = useState(1);
	const [cantLlevada, setCantLlevada] = useState(0);
	const [relacionados, setRelacionados] = useState(0);
	const [carritoLleno, setCarritoLleno] = useState(false);
	useEffect(() => {
		nombre_url &&
			//@ts-ignore
			GetProductos({ nombre_url })
				.then((res) => {
					if (!res.ok) {
						Wredirect();
						return;
					}
					let resProducto = res.productos.docs[0];
					const resDetalles = res.detalle_producto;
					resDetalles && (resProducto.detalle_producto = resDetalles);
					setProducto(resProducto);
					setCantLlevada(GetCantidadProductoCarrito(resProducto.pid));
					//seleccionando una categoria al azar
					const categorias_names = resProducto.categorias_names;
					GetProductos({ limit: 7, categorias: categorias_names })
						.then((resRel) => {
							const prodRelacionados = resRel.productos.docs.filter(
								(p: any) => p.nombre_url != resProducto.nombre_url
							);
							setRelacionados(prodRelacionados);
						})
						.catch();
				})
				.catch((e) => {
					Wredirect();
					return;
				});
	}, [nombre_url]);
	const añadirAlCarrito = () => {
		const nuevaCant = PonerProductoCarrito({
			p: producto.pid,
			c: cantidad,
			maxc: producto.cantidad,
		});
		//@ts-ignore
		if (nuevaCant === -1) {
			setCarritoLleno(true);
			return;
		}
		//@ts-ignore
		setCantLlevada(nuevaCant);
	};
	return (
		<>
			{producto ? (
				<>
					{me.admin && <EditarProductoBTN id_edit_prod={producto.nombre_url} />}
					<Volver cantPagesBack={2} />
					<h1 className="producto__titulo">{Capitalize(producto.nombre)}</h1>
					<ProductoHead
						precio={producto.precio}
						imagenes={producto.detalle_producto?.imagenes}
						cantidad_disponible={producto.cantidad}
						cantidad_carrito={cantLlevada}
						irCarritoUrl="/carrito"
						onAddCarrito={añadirAlCarrito}
						onChangeCantidad={(c: number) => {
							setCantidad(c);
						}}
						porcentaje_descuento={producto.porcentaje_descuento}
					/>
					<ProductoBody contenido={producto.detalle_producto?.descripcion} />
					<ProductoRelacionados productosRel={relacionados} />
					<br />
					{carritoLleno && (
						<VentanaModal
							titulo={'Carrito Lleno!'}
							onClose={() => {
								setCarritoLleno(false);
							}}
						>
							Ya llevas demasiados productos en el carrito.
							<br />
							<br />
							<Link passHref href="/carrito">
								<a>
									<BotonFAColores1 backgroundColor="#f9423a">
										<i className="fas fa-shopping-cart"></i>
										Ir al carrito
									</BotonFAColores1>
								</a>
							</Link>
						</VentanaModal>
					)}
				</>
			) : (
				<p className="CENTERABSOLUTE">Cargando...</p>
			)}
		</>
	);
};

export default Producto;
