import React, { useState } from 'react';

const Secciones = ({ onSelect }: any) => {
	const [seleccion, setSeleccion] = useState('descuentos');
	return (
		<section className="secciones NOSELECT">
			<nav className="secciones__opciones">
				<div
					onClick={() => {
						setSeleccion('descuentos');
						onSelect('descuentos');
					}}
					className={`secciones__opcion ${
						seleccion == 'descuentos' && 'secciones__opcion--seleccionada'
					}`}
				>
					Ofertas
				</div>
				<div
					onClick={() => {
						setSeleccion('novedades');
						onSelect('novedades');
					}}
					className={`secciones__opcion ${
						seleccion == 'novedades' && 'secciones__opcion--seleccionada'
					}`}
				>
					Novedades
				</div>
			</nav>
		</section>
	);
};

export default Secciones;
