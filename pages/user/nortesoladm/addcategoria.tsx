//TODO: LOS ARREGLOS O CATEGORIAS NO DEBEN TENER COMAS ";;" ya que se utilizan para separar los valores.

import React from 'react';
import { useState, useEffect } from 'react';
import BotonFAColores1 from '../../../components/general/BotonFAColores1';
import VentanaModal from '../../../components/general/VentanaModal';
import Volver from '../../../components/general/Volver';
import GetCategorias from '../../../helpers/GetCategorias';
import CrearCategoria from '../../../helpers/CrearCategoria';
import Wredirect from '../../../helpers/Wredirect';

const Addcategoria = ({ me, auth }: any) => {
	const [categorias, setCategorias] = useState([]);
	const [categoriaTitulo, setCategoriaTitulo] = useState('');
	const [categoriaMsg, setCategoriaMsg] = useState('');
	const [categoriaModal, setCategproaModal] = useState(false);

	const handdleCategoria = async (e: FormDataEvent | any) => {
		e.preventDefault();
		const categoria = e.target.categoria.value;
		categoria &&
			CrearCategoria({ nombre: categoria })
				.then((c) => {
					if (c.ok) {
						setCategoriaTitulo('Categoria Creada');
						setCategoriaMsg('Categoria creada con exito');
					} else {
						setCategoriaTitulo('Error');
						setCategoriaMsg(c.msg);
					}
				})
				.catch((e) => {
					setCategoriaTitulo('Error');
					setCategoriaMsg('Contacte con el administrador');
				});
		categoria && setCategproaModal(true);
	};

	useEffect(() => {
		if (!me.admin) return;
		!categoriaModal &&
			GetCategorias()
				.then((c) => {
					setCategorias(c);
				})
				.catch();
	}, [categoriaModal]);
	if (!me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			<Volver />
			<h1 className="producto__titulo">Crear Categoria</h1>
			<br />
			<div className="LABELINPUT">
				<label>Categorias ingresadas</label>
				<select multiple>
					{categorias.map((c: { [key: string]: string } | any, i) => (
						<option
							// selected={'Otras' === m}
							key={i}
						>
							{c.nombre}
						</option>
					))}
				</select>
			</div>
			<hr />
			<form onSubmit={handdleCategoria}>
				<div className="LABELINPUT">
					<label htmlFor="categoria">Nueva categoria</label>
					<input id="categoria" type="text" />
				</div>
				<BotonFAColores1 backgroundColor="#ff6a39">
					Ingresar Categoria
				</BotonFAColores1>
			</form>

			{categoriaModal && (
				<VentanaModal
					titulo={categoriaTitulo}
					onClose={() => {
						setCategproaModal(false);
					}}
				>
					{categoriaMsg}
				</VentanaModal>
			)}
		</>
	);
};

export default Addcategoria;
