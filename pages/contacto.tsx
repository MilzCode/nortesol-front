import React from 'react';
import BotonFAColores1 from '../components/general/BotonFAColores1';
import VentanaModal from '../components/general/VentanaModal';
import Volver from '../components/general/Volver';

const Contacto = () => {
	const [copy, setCopy] = React.useState(false);
	return (
		<div className="contacto">
			<Volver />
			{copy && (
				<VentanaModal
					titulo="Copiado!"
					onClose={() => {
						setCopy(false);
					}}
				>
					Texto copiado al portapapeles :D
				</VentanaModal>
			)}
			<h1 className="producto__titulo">Contacto</h1>
			<br />
			<div className="contacto__box">
				<br />
				<br />
				<h3>Whatsapp </h3>

				<a
					href="https://wa.me/56938985806?text=Hola%21%20librerianortesol.cl%20%3AD"
					target="_blank"
					rel="noreferrer"
				>
					<BotonFAColores1 backgroundColor="#48d597">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i className="fab fa-whatsapp"></i>
						&nbsp;+56 9 9999 9999
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</BotonFAColores1>
				</a>
				<br />
				<h3>Correo </h3>
				<BotonFAColores1
					backgroundColor="#00a5df"
					onClick={() => {
						navigator.clipboard.writeText('nortesolservicios@nortesol.cl');
						setCopy(true);
					}}
				>
					<i className="fas fa-envelope"></i>
					&nbsp; nortesolservicios@nortesol.cl
				</BotonFAColores1>
				<br />
				<h3>Teléfono</h3>
				<BotonFAColores1
					backgroundColor="#69b3e7"
					onClick={() => {
						navigator.clipboard.writeText('+56 9 9999 9999');
						setCopy(true);
					}}
				>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<i className="fas fa-phone"></i>
					&nbsp; +56 9 9999 9999
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</BotonFAColores1>
				<br />
				<h3>Dirección</h3>
				<p>Av. Pedro Aguirre Cerda 9680</p>
				<h3>Horario de atención</h3>
				<p>Lunes a Viernes de 9:00 a 18:00 hrs</p>
				<br />
			</div>
			<br />
		</div>
	);
};

export default Contacto;
