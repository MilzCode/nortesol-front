//TODO: LOS ARREGLOS O MARCAS NO DEBEN TENER COMAS ";;" ya que se utilizan para separar los valores.
import React from 'react';
import { useState, useEffect } from 'react';
import GetMarcas from '../../../helpers/GetMarcas';
import BotonFAColores1 from '../../../components/general/BotonFAColores1';
import CrearMarca from '../../../helpers/CrearMarca';
import VentanaModal from '../../../components/general/VentanaModal';
import Volver from '../../../components/general/Volver';
import Wredirect from '../../../helpers/Wredirect';

const Addmarca = ({ me, auth }: any) => {
	const [marcas, setMarcas] = useState([]);
	const [marcaTitulo, setMarcaTitulo] = useState('');
	const [marcaMsg, setMarcaMsg] = useState('');
	const [marcaModal, setMarcaModal] = useState(false);

	const handdleMarca = async (e: FormDataEvent | any) => {
		e.preventDefault();
		const marca = e.target.marca.value;
		marca &&
			CrearMarca({ nombre: marca })
				.then((m) => {
					if (m.ok) {
						setMarcaTitulo('Marca Creada');
						setMarcaMsg('Marca creada con exito');
					} else {
						setMarcaTitulo('Error');
						setMarcaMsg(m.msg);
					}
				})
				.catch((e) => {
					setMarcaTitulo('Error');
					setMarcaMsg('Contacte con el administrador');
				});
		marca && setMarcaModal(true);
	};

	useEffect(() => {
		if (!me.admin) return;
		!marcaModal &&
			GetMarcas()
				.then((m) => {
					setMarcas(m);
				})
				.catch();
	}, [marcaModal]);

	if (!me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			<Volver />
			<h1 className="producto__titulo">Crear Marca</h1>
			<br />
			<div className="LABELINPUT">
				<label>Marcas ingresadas</label>
				<select multiple>
					{marcas.map((m: { [key: string]: string } | any, i) => (
						<option
							// selected={'Otras' === m}
							key={i}
						>
							{m.nombre}
						</option>
					))}
				</select>
			</div>
			<hr />
			<form onSubmit={handdleMarca}>
				<div className="LABELINPUT">
					<label htmlFor="marca">Nueva marca</label>
					<input id="marca" type="text" />
				</div>
				<BotonFAColores1 backgroundColor="#ff6a39">
					Ingresar Marca
				</BotonFAColores1>
			</form>

			{marcaModal && (
				<VentanaModal
					titulo={marcaTitulo}
					onClose={() => {
						setMarcaModal(false);
					}}
				>
					{marcaMsg}
				</VentanaModal>
			)}
		</>
	);
};

export default Addmarca;
