import React from 'react';
import Link from 'next/link';

const Footer = ({ appMode }: any) => {
	return (
		<footer
			className="footer"
			style={{ backgroundColor: appMode == 1 ? '#f9423a' : '' }}
		>
			<div className="footer__contenido">
				<img
					className="footer__logo NOSELECT"
					src="/static/img/logoNortesol.png"
					alt="logo"
				/>
				<span className="footer__datos">
					Correo: nortesolservicios@nortesol.cl
					<br />
					Dirección: Av. Pedro Aguirre Cerda 9680
					<br />
					<Link href="/contacto" passHref>
						<a className="LINK">Términos y condiciones.</a>
					</Link>
				</span>
			</div>
			<div className="footer__followRRSS"></div>
			{/* <div className="footer__creditos">Creado ♥ por MILZ Soluciones</div> */}
		</footer>
	);
};

export default Footer;
