import React from 'react';
import Link from 'next/link';
import Volver from '../../components/general/Volver';
import BotonFAColores1 from '../../components/general/BotonFAColores1';

const failure = () => {
	return (
		<>
			<Volver url="/" />
			<div className="buyResp">
				<h1 className="producto__titulo">
					Hubo un problema al procesar el pago
				</h1>
				<p className="buyResp__msg">
					Lo sentimos, hubo un problema al procesar tu pago.
					<br />
					Tu compra no se ha realizado.
				</p>
				<Link href="/carrito" passHref>
					<a>
						<BotonFAColores1>Ir al Carrito</BotonFAColores1>
					</a>
				</Link>
			</div>
		</>
	);
};

export default failure;
