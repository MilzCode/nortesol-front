import React, { useEffect } from 'react';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import Volver from '../../components/general/Volver';
import ContenidoTablaPedidos from '../../components/user/ContenidoTablaPedidos';
import Link from 'next/link';
import GetMisPedidos from '../../helpers/GetMisPedidos';
import Capitalize from '../../utils/capitalize';
import formatNumberToprice from '../../utils/formatoPrecio';

const User = ({ me }: any) => {
	const [pedidos, setPedidos] = React.useState([]);
	const [isPedidos, setIsPedidos] = React.useState(false);
	useEffect(() => {
		GetMisPedidos({ idUsuario: me.uid })
			.then((resp) => {
				if (resp.ok) {
					if (resp.pedidos.totalDocs === 0) {
						return;
					}
					setPedidos(resp.pedidos.docs);
					setIsPedidos(true);
				}
			})
			.catch((e) => {});
	}, []);

	return (
		<>
			<Volver />
			<div className="user">
				<h2 className="user__titulo">Hola, {me.nombre}</h2>
				{me.admin && (
					<div className="user__misDatos">
						<h3 className="user__misDatosTitulo">Administrador</h3>

						<Link href="/user/nortesoladm" passHref>
							<div>
								<BotonFAColores1 backgroundColor="#48d597">
									Ir a panel administrador
								</BotonFAColores1>
							</div>
						</Link>
					</div>
				)}
				<hr />
				<div className="user__misDatos">
					<h3 className="user__misDatosTitulo">Mis Datos</h3>
					<div className="user__misDatosContenido">
						<p>Nombre: {me.nombre}</p>
						<p>Rut: {me.rut}</p>
						<p>Celular: +56 {me.celular}</p>
					</div>
					<Link href="/user/edit" passHref>
						<div>
							<BotonFAColores1 backgroundColor="#48d597">
								Modificar mis datos
							</BotonFAColores1>
						</div>
					</Link>
				</div>
				<hr />
				{/* <div className="user__misDirecciones">
          <h3 className="user__misDireccionesTitulo">Mis Direcciones</h3>
          <div className="user__misDireccionesContenido">
            <div className="user__direccion">
              <h4>Direccion 1</h4>
              <p>Region: Metropolitana</p>
              <p>Comuna: Las Condes</p>
              <p>Direccion: Avenida Siempreviva 123</p>
              <div className="user__botones">
                <Link href="/user/edit-address" passHref>
                  <div>
                    <BotonFAColores1 backgroundColor="#48d597">
                      <i className="fas fa-pen-square"></i>
                      Modificar direccion
                    </BotonFAColores1>
                  </div>
                </Link>

                <BotonFAColores1 backgroundColor="#f9423a">
                  <i className="fas fa-trash-alt"></i>
                  Eliminar direccion
                </BotonFAColores1>
              </div>
            </div>
            <hr />
            <div className="user__direccion">
              <h4>Direccion 1</h4>
              <p>Region: Metropolitana</p>
              <p>Comuna: Las Condes</p>
              <p>Direccion: Avenida Siempreviva Siempreviva 123</p>
              <div className="user__botones">
                <Link href="/user/edit-address" passHref>
                  <div>
                    <BotonFAColores1 backgroundColor="#48d597">
                      <i className="fas fa-pen-square"></i>
                      Modificar direccion
                    </BotonFAColores1>
                  </div>
                </Link>
                <BotonFAColores1 backgroundColor="#f9423a">
                  <i className="fas fa-trash-alt"></i>
                  Eliminar direccion
                </BotonFAColores1>
              </div>
            </div>
            <hr />
            <div className="user__botones">
              <Link href="/user/add-address" passHref>
                <div>
                  <BotonFAColores1 backgroundColor="#69b3e7">
                    <i className="fas fa-plus"></i>
                    Agregar direccion
                  </BotonFAColores1>
                </div>
              </Link>
            </div>
          </div>
        </div> */}
				<div className="user__misDirecciones">
					<h3 className="user__misDireccionesTitulo">Mi Dirección</h3>
					<div className="user__misDireccionesContenido">
						<div className="user__direccion">
							<h4>Dirección de envio</h4>
							<p>Region: {me.region}</p>
							<p>Ciudad: {me.ciudad}</p>
							<p>Direccion: {me.direccion}</p>
							<div className="user__botones">
								<Link href="/user/edit-address" passHref>
									<div>
										<BotonFAColores1 backgroundColor="#48d597">
											<i className="fas fa-pen-square"></i>
											Modificar direccion
										</BotonFAColores1>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<hr />
				<div className="user__misPedidos" id="ultimospedidos">
					<h2 className="user__titulo2">Ultimos Pedidos</h2>
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
												<>
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
																<span>
																	Direccion: {pedido.ubicacion.direccion}
																</span>
															</li>
														</ul>
													)}
													<br />
												</>
											</ContenidoTablaPedidos>
										);
									})}
								</tbody>
							</table>
							<Link href="/user/orders" passHref>
								<div>
									<BotonFAColores1 backgroundColor="#48d597">
										Ver todos los pedidos
									</BotonFAColores1>
								</div>
							</Link>
						</>
					)}
					{!isPedidos && (
						<div className="WHITEBACKGROUND">
							<h4 className="TEXT1">No hay pedidos</h4>
						</div>
					)}
				</div>
			</div>
			<br />
		</>
	);
};

export default User;
