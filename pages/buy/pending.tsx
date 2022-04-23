import React from 'react';
import Link from 'next/link';
import Volver from '../../components/general/Volver';
import BotonFAColores1 from '../../components/general/BotonFAColores1';

const pending = () => {
	return (
		<>
			<Volver url="/" />
			<div className="buyResp">
				<h1 className="producto__titulo">Tu pago aún no se ha procesado</h1>
				<p className="buyResp__msg">
					Por favor, espere a que su banco procese el pago.
					<br />
					Si el pago es procesado, podrás ver el estado de tu pedido en la
					sección últimos pedidos de&nbsp;
					<Link href="/user#ultimospedidos" passHref>
						<a className="LINK">“Mi Cuenta”.</a>
					</Link>
					&nbsp;
				</p>
				<Link href="/" passHref>
					<BotonFAColores1>Ir a la página principal</BotonFAColores1>
				</Link>
			</div>
		</>
	);
};

export default pending;
