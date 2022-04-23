import React, { useState, useEffect } from 'react';
import GetProductos from '../../helpers/GetProductos';
import Volver from '../../components/general/Volver';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import VentanaModal from '../../components/general/VentanaModal';
import EditorTexto from '../../components/nortesoladm/EditorTexto';
import GetMarcas from '../../helpers/GetMarcas';
import GetCategorias from '../../helpers/GetCategorias';
import Select from 'react-select';
import Capitalize from '../../utils/capitalize';
import EditarProductoHelper from '../../helpers/EditarProductoHelper';
import ProductoHead from '../../components/venta/ProductoHead';
import ProductoBody from '../../components/venta/ProductoBody';
import ProductoRelacionados from '../../components/venta/ProductoRelacionados';
import { MAXCATEGORIASPORPRODUCTO, paths } from '../../utils/constantes';
import Des_HabilitarProducto from '../../helpers/Des_HabilitarProducto';
import Wredirect from '../../helpers/Wredirect';
import ProductoVistaMiniatura from '../venta/ProductoVistaMiniatura';
import CrearProducto from '../../helpers/CrearProducto';
import formatNumberToprice from '../../utils/formatoPrecio';
import { CalcularDescuento } from '../../utils/calcular-descuento';

//cantidad maxima de imagenes que se pueden subir
const maxImg = 2;

interface EditarProdProps {
	me: any;
	id_edit_prod?: any;
	desabilitado?: boolean;
	create?: boolean;
}
const ProductoStateIni = {
	nombre: '',
	precio: 9999999,
	categorias: [],
	marca: '',
	cantidad: 0,
	descripcion: '',
	imagenes: [],
	load: false,
	idProd: '',
	relevancia: 2,
	porcentaje_descuento: 0,
};
const EditarProd = ({
	me,
	id_edit_prod = null,
	desabilitado = false,
	create = false,
}: EditarProdProps) => {
	const [producto, setProducto] = useState(ProductoStateIni);
	const [confirmarBorrarLocalCreate, setConfirmarBorrarLocalCreate] = useState(
		false
	);
	const [confirmarBorrar, setConfirmarBorrar] = useState(false);
	const [preview, setPreview] = useState(false);
	const [siguiente, setSiguiente] = useState(false);
	const [categoriasOpt, setCategoriasOpt] = useState<any>([]);
	const [marcasOpt, setMarcaOpt] = useState([]);
	const [imagenes, setImagenes] = useState<any>([]);
	const [imagenesPreview, setImagenesPreview] = useState<any>([]);
	//upload
	const [subido, setSubido] = useState(false);
	const [subir, setSubir] = useState(false);
	const [subidoMsg, setSubidoMsg] = useState('Producto actualizado con exito');
	const [errSubir, setErrSubir] = useState(false);
	const [errSubirMSG, setErrSubirMSG] = useState('');
	const [newUrl, setNewUrl] = useState('/');
	const [createDesabilitado, setCreateDesabilitado] = useState(true);

	const handdleBorrarProducto = () => {
		if (create) return;
		Des_HabilitarProducto({ id: producto.idProd }, desabilitado)
			.then((res) => {
				if (res.ok) {
					Wredirect();
					return;
				}

				alert('Hubo un problema contacta al administrador');
			})
			.catch(() => {
				alert('Hubo un problema contacta al administrador*');
			});
	};
	const handdleSiguiente = () => {
		setSiguiente(true);
	};
	const handdleAnterior = () => {
		setSiguiente(false);
	};
	const handdlePreview = () => {
		setPreview(!preview);
	};
	const handdleProducto = (prop: any) => {
		const data = { ...producto, ...prop };
		setProducto(data);
	};

	const handdleImagenes = (e: any) => {
		if (e.target.files.length > maxImg) {
			alert(`Solo se pueden subir ${maxImg} imagenes `);
			return;
		}
		let dataUrls = [];
		for (let i = 0; i < e.target.files.length; i++) {
			dataUrls.push(URL.createObjectURL(e.target.files[i] as any));
		}
		setImagenes(e.target.files);
		setImagenesPreview(dataUrls);
	};

	const puedeSubir =
		producto.nombre &&
		//@ts-ignore
		producto.categorias.length > 0 &&
		producto.marca &&
		producto.cantidad &&
		producto.precio &&
		//@ts-ignore
		imagenesPreview.length > 0 &&
		producto.porcentaje_descuento >= 0 &&
		producto.porcentaje_descuento < 100;
	!subir;

	const actualizarCrearProducto = async () => {
		setSubir(true);
		const data = {
			descripcion: producto.descripcion,
			nombre: producto.nombre,
			precio: producto.precio,
			categorias: producto.categorias.map((c: any) => c.value),
			cantidad: producto.cantidad,
			imagenes,
			//@ts-ignore
			marca: producto.marca.value,
			idProd: producto.idProd,
			relevancia: producto.relevancia,
			porcentaje_descuento: producto.porcentaje_descuento,
		};

		let res = null;
		if (!create) {
			res = await EditarProductoHelper(data, desabilitado);
		} else {
			res = await CrearProducto(data, createDesabilitado);
		}

		if (!res.ok) {
			setSubir(false);
			setErrSubir(true);
			setErrSubirMSG(res.msg);
			return;
		}
		if (res.type === 'noimage') {
			alert('La imagen no se pudo subir');
			setSubidoMsg('Producto Subido, pero no se pudo subir las imagenes');
		}
		if (create) {
			handdleBorrarLocalCreate();
			setSubidoMsg('Producto creado con exito');
		}
		setSubir(false);
		setSubido(true);
		setNewUrl(res.newUrl);
	};

	const handdleGuardarLocalCreate = () => {
		if (!create) return;
		localStorage.setItem('createNombre', producto.nombre);
		localStorage.setItem('createDescripcion', producto.descripcion);
		localStorage.setItem('createPrecio', producto.precio + '');
	};
	const handdleBorrarLocalCreate = () => {
		if (!create) return;
		localStorage.removeItem('createNombre');
		localStorage.removeItem('createDescripcion');
		localStorage.removeItem('createPrecio');
		setProducto(ProductoStateIni);
	};
	//actualizar
	useEffect(() => {
		if (!me.admin) return;
		if (create) return;
		id_edit_prod &&
			//@ts-ignore
			GetProductos({ nombre_url: id_edit_prod }, desabilitado)
				.then(
					(res: {
						ok: false;
						productos: { docs: any };
						detalle_producto: { [key: string]: string | any };
					}) => {
						try {
							if (!res.ok && res.productos.docs.length == 0) {
								Wredirect();
								return;
							}
							//@ts-ignore
							const productRes = res.productos.docs[0];

							let {
								nombre,
								precio,
								categorias,
								marca,
								id,
								cantidad,

								relevancia,
								porcentaje_descuento,
							} = productRes;
							if (categorias) {
								//@ts-ignore

								categorias = categorias.map((categoria: any) => {
									return {
										value: categoria._id,
										label: Capitalize(categoria.nombre),
									};
								});
							}

							if (marca) {
								//@ts-ignore
								marca = {
									value: marca._id,
									label: Capitalize(marca.nombre),
								};
							}
							//@ts-ignore
							let descripcion = ProductoStateIni.descripcion;
							let imagenes = ProductoStateIni.imagenes;
							const detalleProducto = res.detalle_producto;
							if (detalleProducto) {
								descripcion = detalleProducto.descripcion;
								imagenes = detalleProducto.imagenes;
							}
							setImagenesPreview(imagenes);
							setProducto({
								nombre,
								precio,
								categorias,
								marca,
								cantidad,
								descripcion,
								imagenes,
								load: true,
								idProd: id,
								relevancia,
								porcentaje_descuento,
							});
							//@ts-ignore
							setNewUrl(productRes.nombre_url);
						} catch (error) {}
					}
				)
				.catch(() => {
					Wredirect();
					return;
				});
	}, [id_edit_prod]);
	//create
	useEffect(() => {
		if (!create) return;
		const datosIni = {
			nombre: localStorage.getItem('createNombre') || '',
			descripcion: localStorage.getItem('createDescripcion') || '',
			precio: localStorage.getItem('createPrecio') || '',
		};
		//@ts-ignore
		// setProducto({ ...datosIni, ...producto });
	}, []);

	useEffect(() => {
		if (!me.admin) return;
		GetCategorias().then((c) => setCategoriasOpt(c));
		GetMarcas().then((m) => setMarcaOpt(m));
	}, []);

	return (
		<>
			{producto && (
				<>
					<br />
					<hr />
					<div className="BOTONES">
						{!preview && (
							<>
								{create && (
									<>
										<BotonFAColores1
											backgroundColor="#f9423a"
											onClick={() => {
												setConfirmarBorrarLocalCreate(true);
											}}
										>
											Borrar Local
										</BotonFAColores1>
										<BotonFAColores1 onClick={handdleGuardarLocalCreate}>
											Guardar
										</BotonFAColores1>
										{confirmarBorrarLocalCreate && (
											<VentanaModal
												titulo="¿Borrar Localmente?"
												onClose={() => {
													setConfirmarBorrarLocalCreate(false);
												}}
											>
												<BotonFAColores1
													onClick={() => {
														setConfirmarBorrarLocalCreate(false);
														handdleBorrarLocalCreate();
													}}
													backgroundColor="#f9423a"
												>
													Si
												</BotonFAColores1>
											</VentanaModal>
										)}
									</>
								)}
								{!create && (
									<BotonFAColores1
										onClick={() => {
											setConfirmarBorrar(true);
										}}
										backgroundColor={!desabilitado ? '#f9423a' : '#48d597'}
									>
										{!desabilitado ? (
											<i className="fas fa-trash"></i>
										) : (
											<i className="fas fa-arrow-up"></i>
										)}

										{!desabilitado
											? '¡BORRAR PRODUCTO!'
											: 'HABILITAR PRODUCTO!'}
									</BotonFAColores1>
								)}
								{confirmarBorrar && (
									<VentanaModal
										titulo={
											!desabilitado
												? '¿Quieres BORRAR este producto?'
												: '¿Quieres HABILITAR este producto?'
										}
										onClose={() => {
											setConfirmarBorrar(false);
										}}
									>
										<BotonFAColores1
											backgroundColor="#f9423a"
											onClick={handdleBorrarProducto}
										>
											Si
										</BotonFAColores1>
										&nbsp;&nbsp;&nbsp;
										<BotonFAColores1
											backgroundColor="#69b3e7"
											onClick={() => {
												setConfirmarBorrar(false);
											}}
										>
											No
										</BotonFAColores1>
									</VentanaModal>
								)}

								{siguiente && (
									<BotonFAColores1
										backgroundColor="#ff6a39"
										onClick={handdleAnterior}
									>
										<i className="fas fa-arrow-left"></i>
										&nbsp;Anterior
									</BotonFAColores1>
								)}

								{!siguiente && (
									<BotonFAColores1
										backgroundColor="#00a5df"
										onClick={handdleSiguiente}
									>
										Siguiente&nbsp;
										<i className="fas fa-arrow-right"></i>
									</BotonFAColores1>
								)}
							</>
						)}
						<BotonFAColores1 backgroundColor="#69b3e7" onClick={handdlePreview}>
							{!preview && <i className="fas fa-eye"></i>}
							{preview && <i className="fas fa-eye-slash"></i>}
						</BotonFAColores1>
					</div>
					<br />
					{!siguiente && !preview && (
						<>
							<h1 className="TITULOSFORM">Editor de descripción</h1>
							<hr />
							<EditorTexto
								setStateContenido={(descripcion: any) =>
									handdleProducto({ descripcion })
								}
								dataInicial={producto.descripcion}
							/>
						</>
					)}
					{siguiente && !preview && (
						<>
							<h1 className="TITULOSFORM">Datos del producto</h1>
							<hr />
							<div className="LABELINPUT">
								<label>Nombre</label>
								<input
									type="text"
									value={producto.nombre}
									onChange={(nombre) => {
										handdleProducto({ nombre: nombre.target.value });
									}}
								/>
							</div>
							<div className="LABELINPUT">
								<label>Precio</label>
								<input
									type="text"
									value={producto.precio}
									onChange={(precio: any) => {
										!isNaN(Number(precio.target.value)) &&
											handdleProducto({
												precio: Math.round(precio.target.value),
											});
									}}
									onKeyDown={() => {
										return false;
									}}
								/>
							</div>
							<div className="LABELINPUT">
								<label>
									Porcentaje de descuento [
									{formatNumberToprice(
										CalcularDescuento(
											producto.precio,
											producto.porcentaje_descuento
										)
									)}
									]
								</label>
								<input
									type="text"
									value={producto.porcentaje_descuento}
									onChange={(porcentaje_descuento: any) => {
										!isNaN(Number(porcentaje_descuento.target.value)) &&
											porcentaje_descuento.target.value >= 0 &&
											porcentaje_descuento.target.value < 100 &&
											handdleProducto({
												porcentaje_descuento: Math.floor(
													porcentaje_descuento.target.value
												),
											});
									}}
								/>
							</div>

							<div className="LABELINPUT">
								<label htmlFor="relevancia">Relevancia (2 por defecto)</label>
								<select
									defaultValue={producto.relevancia}
									id="relevancia"
									onChange={(relevancia) => {
										handdleProducto({
											relevancia: relevancia.target.value,
										});
									}}
								>
									<option value="0">0</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
								</select>
							</div>
							<div className="LABELINPUT">
								<label htmlFor="categorias">Categorias</label>
								<Select
									inputId="categorias"
									isMulti
									name="categorias"
									options={categoriasOpt.map((c: any) => ({
										value: c.id,
										label: Capitalize(c.nombre),
									}))}
									className="basic-multi-select"
									classNamePrefix="select"
									value={producto.categorias}
									onChange={(categorias: any) =>
										categorias.length <= MAXCATEGORIASPORPRODUCTO &&
										setProducto({ ...producto, categorias })
									}
									placeholder="Filtrar categoria"
								/>
							</div>

							<div className="LABELINPUT">
								<label htmlFor="marcas">Marca</label>
								<Select
									inputId="marcas"
									name="marcas"
									options={marcasOpt.map((m: any) => ({
										value: m.id,
										label: Capitalize(m.nombre),
									}))}
									classNamePrefix="select"
									value={producto.marca}
									onChange={(marca: any) => {
										setProducto({ ...producto, marca });
									}}
									placeholder="Filtrar Marca"
								/>
							</div>
							<div className="LABELINPUT">
								<label>Cantidad disponible</label>
								<input
									type="text"
									value={producto.cantidad}
									onChange={(cantidad: any) => {
										!isNaN(Number(cantidad.target.value)) &&
											handdleProducto({
												cantidad: Math.round(cantidad.target.value),
											});
									}}
								/>
							</div>
							<hr />
							{/* imagenes */}
							<div className="LABELINPUT">
								<label>
									Imagenes (maximo {maxImg} imagenes), {imagenesPreview.length}{' '}
									subidas
								</label>
								<br />
								<label htmlFor="imagenes">
									<div className="UPLOADIMAGELOGO">
										<i className="far fa-image"></i>
										<i className="fas fa-upload"></i>
									</div>
								</label>
								<input
									id="imagenes"
									type="file"
									multiple
									onChange={handdleImagenes}
									accept="image/png, image/jpeg"
									style={{ display: 'none' }}
								/>

								{imagenesPreview.length > 0 && (
									<div className="IMAGEPREVIEW">
										<br />
										{imagenesPreview.map((img: any, i: number) => {
											return <img key={i} src={img} alt="imagen" />;
										})}
									</div>
								)}
								<br />
							</div>
							{create && (
								<>
									<hr />
									<div className="LABELINPUT">
										<label htmlFor="">¿Desabilitado al crear?</label>
									</div>
									<br />
									<div className="BOTONES">
										<BotonFAColores1
											backgroundColor="#ef3340"
											disabled={createDesabilitado}
											onClick={() => {
												setCreateDesabilitado(true);
											}}
										>
											Si
										</BotonFAColores1>
										&nbsp; &nbsp; &nbsp;
										<BotonFAColores1
											backgroundColor="#00a5df"
											disabled={!createDesabilitado}
											onClick={() => {
												setCreateDesabilitado(false);
											}}
										>
											No
										</BotonFAColores1>
									</div>
									<br />
								</>
							)}

							<hr />
							{subir && <h3>SUBIENDO PRODUCTO ESPERA...</h3>}
							{errSubir && (
								<VentanaModal
									titulo={'Error al subir'}
									onClose={() => {
										setSubir(false);
										setSubido(false);
										setErrSubir(false);
										setErrSubirMSG('');
									}}
								>
									{errSubirMSG}
								</VentanaModal>
							)}
							{subido && (
								<VentanaModal
									titulo={!create ? 'Producto Actualizado' : 'Producto Subido'}
									onClose={() => {
										if (createDesabilitado && create) {
											Wredirect(paths.productoDes + '/' + newUrl);
											return;
										}
										Wredirect(
											(!desabilitado ? paths.producto : paths.productoDes) +
												'/' +
												newUrl
										);
									}}
								>
									{subidoMsg}
									{create && (
										<>
											<br />
											<br />
											<BotonFAColores1
												backgroundColor="#00a5df"
												onClick={() => {
													Wredirect(paths.addProduct);
												}}
											>
												Crear otro producto
											</BotonFAColores1>
										</>
									)}
								</VentanaModal>
							)}
							<br />
							<BotonFAColores1
								backgroundColor="#f4da40"
								disabled={!puedeSubir}
								onClick={actualizarCrearProducto}
							>
								{!puedeSubir ? (
									subir ? (
										'Subiendo producto, espera'
									) : (
										'Faltan campos por llenar'
									)
								) : (
									<>
										Subir :D&nbsp;
										<i className="fas fa-arrow-up"></i>
									</>
								)}
							</BotonFAColores1>
							<br />

							<br />
							<br />
						</>
					)}
					{/* PREVIEW */}
					{preview && (
						<>
							<h1 className="TITULOSFORM">PREVISUALIZACIÓN</h1>
							<hr />
							<h1 className="producto__titulo">
								{producto.nombre ? Capitalize(producto.nombre) : 'Sin titulo'}
							</h1>
							{imagenesPreview.length > 0 ? (
								<ProductoHead
									precio={producto.precio}
									imagenes={imagenesPreview}
									cantidad_disponible={producto.cantidad}
									porcentaje_descuento={producto.porcentaje_descuento}
								/>
							) : (
								<ProductoHead
									precio={producto.precio}
									porcentaje_descuento={producto.porcentaje_descuento}
									cantidad_disponible={producto.cantidad}
								/>
							)}
							<ProductoBody contenido={producto.descripcion} />
							<br />
							<hr />

							<div className="CENTERFLEX">
								<ProductoVistaMiniatura
									nombre={producto.nombre}
									precio={producto.precio}
									porcentaje_descuento={producto.porcentaje_descuento}
									imagen={imagenesPreview ? imagenesPreview[0] : ''}
								/>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default EditarProd;
