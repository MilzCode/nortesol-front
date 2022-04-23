// @ts-nocheck
// tslint:disable
import React, { useState } from 'react';
import Select from 'react-select';
import { formatPriceToNumber } from '../../utils/formatoPrecio';
import SliderPrecios from './SliderPrecios';
import CompareArray from '../../utils/comparar-arrays';
import Cargando from '../general/Cargando';
import BotonFAColores1 from '../general/BotonFAColores1';
import {
	MAXCATEGORIASFILTER,
	MAXMARCASFILTER,
	SEPARADOR,
} from '../../utils/constantes';

interface filtroProps {
	marcas?: Array<{ value: string; label: string }>;
	categorias?: Array<{ value: string; label: string }>;
	precios?: number[];
	onFilter?: (e: any, q: any) => any;
	mode1?: boolean | undefined;
	isLoading?: boolean;
	initialValues?: any;
}

/**
 *
 * Ejemplo: marcas: [{ value: 'torre', label: 'Torre' }]
 *
 *
 * Ejemplo: categorias: [{ value: 'categoria1', label: 'Categoria 1' },...]
 *
 *
 * Ejemplo precios: [0,999999]
 *
 * @param marcas
 * @param categorias
 * @param precios
 *
 */
const Filtro = ({
	marcas,
	categorias,
	precios,
	onFilter = () => {},
	isLoading = false,
	initialValues = {},
	mode1,
}: filtroProps) => {
	marcas = marcas ?? [];
	categorias = categorias ?? [];
	//precios es una variable que maneja string, aunque se inicializa como int para establecer el rango de precios
	precios = precios ?? [0, 1000000];

	const [togle, setTogle] = useState(true);
	const [filtroData, setFiltroData] = useState<any>(initialValues);
	const [filtroPrecios, setFiltroPrecios] = useState(precios);

	const handdleBuscar = (busqueda: any) => {
		let filtroDataCopy = { ...filtroData };
		filtroDataCopy['busqueda'] = busqueda.trim().replace(',', '');
		setFiltroData({ ...filtroData, ...filtroDataCopy });
	};
	const handdleMarcas = (marcas: any) => {
		if (marcas.length > MAXMARCASFILTER) {
			return;
		}
		let filtroDataCopy = { ...filtroData };
		filtroDataCopy['marcas'] = marcas;
		setFiltroData({ ...filtroData, ...filtroDataCopy });
	};
	const handdleCategorias = (categorias: any) => {
		if (categorias.length > MAXCATEGORIASFILTER) {
			return;
		}
		let filtroDataCopy = { ...filtroData };
		filtroDataCopy['categorias'] = categorias;
		setFiltroData({ ...filtroData, ...filtroDataCopy });
	};

	const handdlePrecios = (precios_: any) => {
		setFiltroPrecios(precios_);
	};

	const handdleFiltrar = (e: FormDataEvent | any) => {
		e.preventDefault();
		let precio_min =
			filtroPrecios[0] === precios[0] ? undefined : filtroPrecios[0];
		let precio_max =
			filtroPrecios[1] === precios[1] ? undefined : filtroPrecios[1];
		let query = '?';
		const { busqueda, marcas, categorias } = filtroData;
		if (busqueda) {
			query += `busqueda=${busqueda}&`;
		}
		let marcas_ = marcas?.map((m: any) => m.value);
		if (marcas) {
			query += `marcas=${marcas_.join(SEPARADOR)}&`;
		}
		let categorias_ = categorias?.map((c: any) => c.value);
		if (categorias) {
			query += `categorias=${categorias_.join(SEPARADOR)}&`;
		}
		if (precio_min) {
			query += `precio_min=${precio_min}&`;
		}
		if (precio_max) {
			query += `precio_max=${precio_max}&`;
		}

		onFilter(
			{
				...filtroData,
				categorias: categorias_,
				marcas: marcas_,
				precio_min,
				precio_max,
				load: true,
			},
			query
		);
	};

	return (
		<>
			{categorias && marcas && (
				<form className={`filtro ${togle && 'filtro--noFilter'} NOSELECT`}>
					<div className="filtro__togle" onClick={() => setTogle(!togle)}>
						<span>Filtrar:&nbsp;</span>
						{togle && <i className="far fa-window-maximize"></i>}
						{!togle && <i className="fas fa-window-maximize"></i>}
					</div>
					<div className="filtro__filtroA">
						<label>Nombre:</label>
						<input
							type="text"
							className="INPUT2"
							onChange={(e) => {
								handdleBuscar(e.target.value);
							}}
							defaultValue={initialValues.busqueda}
						/>
					</div>
					<div className="filtro__filtroB">
						<label className="filtro__labelPrecio">Precio:</label>
						<SliderPrecios
							minValue={precios[0]}
							maxValue={precios[1]}
							onChange={(p) => {
								handdlePrecios([
									formatPriceToNumber(p[0]),
									formatPriceToNumber(p[1]),
								]);
							}}
							className="filtro__slider"
						/>
					</div>
					<div className="filtro__filtroA">
						<label>Marca:</label>
						<Select
							inputId="filtro-marca"
							isMulti
							name="marcas"
							options={marcas}
							className="basic-multi-select"
							classNamePrefix="select"
							value={filtroData.marcas}
							onChange={handdleMarcas}
							placeholder="Filtrar marca"
						/>
					</div>

					<div className="filtro__filtroA">
						<label>Categoria:</label>
						<Select
							inputId="filtro-categoria"
							isMulti
							name="categoria"
							options={categorias}
							className="basic-multi-select"
							classNamePrefix="select"
							value={filtroData.categorias}
							onChange={handdleCategorias}
							placeholder="Filtrar categoria"
						/>
					</div>

					<BotonFAColores1
						className="filtro__filtrarBTN"
						disabled={isLoading}
						onClick={handdleFiltrar}
					>
						{isLoading ? (
							<>
								Cargando{' '}
								<i className="CARGANDOICO2">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</i>{' '}
							</>
						) : (
							<>Filtrar</>
						)}
					</BotonFAColores1>
				</form>
			)}
		</>
	);
};

export default Filtro;
