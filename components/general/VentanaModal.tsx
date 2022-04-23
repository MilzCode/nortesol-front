import React, { useState } from 'react';
import Router from 'next/router';
import Wredirect from '../../helpers/Wredirect';

/*
    Este componente es una ventana modal con titulo y parrafo.
    recibe:
    titulo: string
    contenido: string
    redireccionar: string una url a la que redireccionar cuando se cierre la ventana modal (opcional)
    reload: boolean si es true refresca la pagina cuando se cierre la ventana modal (opcional)
*/

interface ventanaModalProps {
	titulo: string;
	redireccionar?: string | null;
	children?: React.ReactNode;
	reload?: boolean;
	onClose?: any;
}

const VentanaModal = ({
	titulo,
	redireccionar = null,
	children,
	reload: refrescar,
	onClose,
}: ventanaModalProps) => {
	const [modal, setModal] = useState(true);
	const handleClose = () => {
		// setModal(false);
		if (refrescar && redireccionar) Wredirect(redireccionar);
		redireccionar && Router.push(redireccionar);
		onClose && onClose();
	};
	return (
		<div className={`ventanaModal${modal ? '' : '--salir'}`}>
			<div className="ventanaModal__contenido">
				<i
					className="fas fa-times ventanaModal__cerrarIco"
					onClick={handleClose}
				></i>
				<p className="ventanaModal__titulo">{titulo}</p>
				<hr />
				<div className="ventanaModal__contenidoIn">{children}</div>
			</div>
		</div>
	);
};

export default VentanaModal;
