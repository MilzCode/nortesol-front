import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DoSignOut from '../../../helpers/DoSignOut';
import GetCantidadTotalCarrito from '../../../helpers/GetCantidadTotalCarrito';
import { paths } from '../../../utils/constantes';
import Wredirect from '../../../helpers/Wredirect';

const Header = ({ auth, path, appMode, out }: any) => {
	const router = useRouter();
	const isPathCarrito = path === '/carrito';
	const [miCuenta, setMiCuenta] = useState(false);
	const [subHeader, setSubHeader] = useState(false);
	const [carritoCant, setCarritoCant] = useState(0);
	const handdleMiCuenta = () => {
		setMiCuenta(!miCuenta);
	};

	const handdleSubmit = (e: any) => {
		e.preventDefault();
		const busqueda = e.target.busqueda.value.trim();
		if (path == '/search') {
			Wredirect('/search' + '?busqueda=' + busqueda);
		} else {
			router.push('/search' + '?busqueda=' + busqueda);
		}
	};

	async function salir() {
		try {
			await DoSignOut();
			await out();
			Wredirect('/');
		} catch (error) {}
	}
	useEffect(() => {
		//@ts-ignore
		setCarritoCant(GetCantidadTotalCarrito());
	}, [path]);
	return (
		<>
			<header
				className="header NOSELECT"
				style={{ backgroundColor: appMode == 1 ? '#f9423a' : '' }}
			>
				<Link passHref href={appMode == 1 ? paths.searchDesabilitados : '/'}>
					<img
						className="header__logo"
						src="/static/img/logoNortesol.png"
						alt="logo nortesol"
					/>
				</Link>
				{appMode == 0 && (
					<>
						<Link passHref href="/contacto">
							<a>
								<div className="header__contacto">
									<i className="fas fa-phone-square" title="ir a contacto" />
									<span>Contacto</span>
								</div>
							</a>
						</Link>

						<form
							className="header__buscador"
							onSubmit={(e) => handdleSubmit(e)}
						>
							<input id="busqueda" type="text" placeholder="Buscar" />
							<button type="submit" name="Boton buscar articulo">
								<i className="fas fa-search" title="Boton buscar articulo" />
							</button>
						</form>
					</>
				)}
				{auth ? (
					appMode == 0 ? (
						<div
							className="header__miCuenta"
							onClick={handdleMiCuenta}
							onMouseLeave={() => {
								miCuenta && handdleMiCuenta();
							}}
						>
							<i className="fas fa-user" />
							<span>Mi cuenta</span>
							<i className="fas fa-sort-down" />
							{miCuenta && (
								<div className="header__miCuentaDesplegable">
									<Link passHref href="/user">
										<div className="header__desplegableOpcion">Mi cuenta</div>
									</Link>
									<div className="header__desplegableOpcion" onClick={salir}>
										Cerrar Sesión
									</div>
								</div>
							)}
						</div>
					) : (
						<Link passHref href="/">
							<div className="header__ingresar">
								<i className="fas fa-times" />
								<span>Salir</span>
							</div>
						</Link>
					)
				) : (
					auth === null && (
						<Link passHref href="/login">
							<div className="header__ingresar">
								<i className="fas fa-user" />
								<span>Ingresar</span>
							</div>
						</Link>
					)
				)}
				{appMode == 0 && (
					<>
						<Link passHref href="/carrito">
							<a>
								<div className="header__carrito">
									<i className="fas fa-shopping-cart" />
									{carritoCant > 0 && !isPathCarrito && (
										<div className="header__carrito-contador">
											<p>{carritoCant}</p>
										</div>
									)}
								</div>
							</a>
						</Link>

						<div
							className="header__subMenuDesplegar"
							onClick={() => setSubHeader(!subHeader)}
						>
							{subHeader ? (
								<i className="fas fa-times" />
							) : (
								<i className="fas fa-bars" />
							)}
						</div>
					</>
				)}
			</header>

			{appMode == 0 && (
				<nav
					className={`subHeader ${
						!subHeader && 'subHeader--desaparecer'
					} NOSELECT`}
				>
					<div className="subHeader__menu">
						<Link passHref href="/">
							<a className="subHeader__menuItem">
								<i className="fas fa-home" title="Ir a pagina principal"></i>
							</a>
						</Link>
						<Link passHref href="/search">
							<a className="subHeader__menuItem">Productos</a>
						</Link>
						<Link passHref href="/search?cat=escolar">
							<a className="subHeader__menuItem">Escolar</a>
						</Link>
						<Link passHref href="/search?busqueda=tempera">
							<a className="subHeader__menuItem">Temperas</a>
						</Link>
						<Link passHref href="/search?cat=otras">
							<a className="subHeader__menuItem">Otras</a>
						</Link>
					</div>
				</nav>
			)}
		</>
	);
};

export default Header;
