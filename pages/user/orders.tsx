import React, { useEffect } from 'react';
import Paginador from '../../components/general/Paginador';
import Volver from '../../components/general/Volver';
import ContenidoTablaPedidos from '../../components/user/ContenidoTablaPedidos';
import GetMisPedidos from '../../helpers/GetMisPedidos';
import Capitalize from '../../utils/capitalize';
import formatNumberToprice from '../../utils/formatoPrecio';

const Orders = ({ me }: any) => {
	const [pedidos, setPedidos] = React.useState([]);
	const [isPedidos, setIsPedidos] = React.useState(false);
	const [pagina, setPagina] = React.useState(1);
	const [maxPagina, setMaxPagina] = React.useState(10);
	useEffect(() => {
		GetMisPedidos({ idUsuario: me.uid, limit: 8, page: pagina })
			.then((resp) => {
				if (resp.ok) {
					if (resp.pedidos.totalDocs === 0) {
						return;
					}
					setPedidos(resp.pedidos.docs);
					setIsPedidos(true);
					setMaxPagina(resp.pedidos.totalPages);
				}
			})
			.catch((e) => {});
	}, [pagina]);

	return (
		<>
			<Volver />
			<br />
			<div className="user__misPedidos">
				<h2 className="user__titulo2">Mis Pedidos</h2>
				{/* <br />
        <form className="user__search">
          <input
            type="text"
            placeholder="Buscar"
          />
          <button>Buscar</button>
        </form>
        <br /> */}
				{isPedidos && pedidos.length > 0 && (
					<>
						<table className="table table-bordered">
							<tbody>
								{pedidos.map((pedido: any, i) => {
									const fecha = new Date(pedido.date).toLocaleDateString();
									const hora = new Date(pedido.date).toLocaleTimeString();
									return (
										<ContenidoTablaPedidos
											id={pedido.id_pay}
											fecha={`${fecha} ${hora}`}
											estado={
												pedido.status === 'approved'
													? pedido.recibido
														? 'Entregado'
														: 'En proceso'
													: 'Pago Devuelto o Cancelado'
											}
											valor={pedido.total}
											key={i}
										>
											{pedido.items.map((item: any, i: any) => (
												<ul key={i}>
													<li>
														<span>Producto: {Capitalize(item.title)}</span>
													</li>
													<li>
														<span>Cantidad: {item.quantity}</span>
													</li>
													<li>
														<span>
															Precio unitario:{' '}
															{formatNumberToprice(item.unit_price)}
														</span>
													</li>
													{/* <li>
															<span>
																Total para este Producto:{' '}
																{formatNumberToprice(
																	item.unit_price * item.quantity
																)}
															</span>
														</li> */}
												</ul>
											))}
											<h4>
												{pedido.domicilio
													? 'Envió a domicilio:'
													: 'Retiro en tienda'}
											</h4>
											{pedido.domicilio && (
												<ul>
													<li>
														<span>Region: {pedido.ubicacion.region}</span>
													</li>
													<li>
														<span>Ciudad: {pedido.ubicacion.ciudad}</span>
													</li>
													<li>
														<span>Direccion: {pedido.ubicacion.direccion}</span>
													</li>
												</ul>
											)}
											<br />
										</ContenidoTablaPedidos>
									);
								})}
							</tbody>
						</table>
					</>
				)}
				{!isPedidos && (
					<div className="WHITEBACKGROUND">
						<h4 className="TEXT1">No hay pedidos</h4>
					</div>
				)}
				<Paginador
					maxPage={maxPagina}
					onChange={(p) => {
						setPagina(p);
					}}
				/>
			</div>
			<br />
		</>
	);
};

export default Orders;
