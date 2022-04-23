import React, { useState, useEffect } from 'react';
import Paginador from '../general/Paginador';
import Volver from '../general/Volver';
import Filtro from '../search/Filtro';
import ProductoVistaMiniatura from '../venta/ProductoVistaMiniatura';
import GetMarcas from '../../helpers/GetMarcas';
import GetCategorias from '../../helpers/GetCategorias';
import Capitalize from '../../utils/capitalize';
import GetProductos from '../../helpers/GetProductos';
import { SEPARADOR } from '../../utils/constantes';
const Search = ({ desabilitados }: any) => {
	const rangoPrecios = [0, 1000000];
	const [pagina, setPagina] = useState(1);
	const [maxPag, setMaxPag] = useState(0);
	const [filtroCampos, setFiltroCampos] = useState<{ [key: string]: any }>({});
	const [productos, setProductos] = useState([]);
	const [marcas, setMarcas] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [loading, setLoading] = useState(true);
	const [initialFilter, setInitialFilter] = useState<any>({ load: false });

	useEffect(() => {
		let filtroCamposInit: { [key: string]: any } = {};
		let initialFilterInit: { [key: string]: any } = {};
		let categoria_nombre = '';
		let busqueda = '';
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		categoria_nombre = urlParams.get('cat') || '';
		busqueda = urlParams.get('busqueda') || '';
		GetMarcas()
			.then((res) => {
				const marcas_ = res.map((m: any) => {
					return { value: m.id, label: Capitalize(m.nombre) };
				});
				setMarcas(marcas_);
			})
			.catch((err) => {});
		GetCategorias()
			.then((res) => {
				let findCategoria: any = {};
				const categorias_ = res.map((c: any) => {
					if (categoria_nombre === c.nombre) {
						findCategoria = { value: c.id, label: Capitalize(c.nombre) };
					}
					return { value: c.id, label: Capitalize(c.nombre) };
				});
				setCategorias(categorias_);
				//SETTING FILTROCAMPOS and initialFilter
				if (busqueda) {
					filtroCamposInit.busqueda = busqueda;
					initialFilterInit.busqueda = busqueda;
				}
				if (findCategoria && findCategoria.value) {
					filtroCamposInit.categorias = [findCategoria.value];
					initialFilterInit.categorias = [findCategoria];
				}
				initialFilterInit.load = true;
				filtroCamposInit.load = true;
				setInitialFilter(initialFilterInit);
				setFiltroCampos(filtroCamposInit);
			})
			.catch((err) => {});
	}, []);

	useEffect(() => {
		if (!filtroCampos.load) {
			return;
		}
		GetProductos({ ...filtroCampos, page: pagina, limit: 12 }, desabilitados)
			.then((res) => {
				if (!res.ok) {
					setLoading(false);
					return;
				}
				setProductos(res.productos.docs);
				setMaxPag(res.productos.totalPages);
				setLoading(false);
			})
			.catch(() => {
				setProductos([]);
				setLoading(false);
			});
	}, [pagina, filtroCampos]);
	useEffect(() => {
		setPagina(1);
	}, [filtroCampos]);

	return (
		<>
			<Volver />
			<br />
			{initialFilter.load && (
				<Filtro
					onFilter={(f) => {
						setFiltroCampos(f);
					}}
					marcas={marcas}
					categorias={categorias}
					precios={rangoPrecios}
					isLoading={loading}
					initialValues={initialFilter}
				/>
			)}
			<br />
			<div className="search__mensajeEncontrados">
				<h2>Productos encontrados</h2>
				{loading && <p>Buscando...</p>}
				{productos && !loading && productos.length == 0 && (
					<p>Sin resultados...</p>
				)}
			</div>
			<br />
			<div className="index__productos">
				{productos &&
					productos.map((p: any, i: any) => (
						<ProductoVistaMiniatura
							nombre={p.nombre}
							nombre_url={p.nombre_url}
							precio={p.precio}
							imagen={p.imagen}
							key={i}
							porcentaje_descuento={p.porcentaje_descuento}
							desabilitado={desabilitados}
						/>
					))}
			</div>
			<Paginador
				maxPage={maxPag}
				onChange={(p) => {
					setPagina(p);
				}}
			/>
		</>
	);
};

export default Search;
