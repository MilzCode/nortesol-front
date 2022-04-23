import React, { useEffect, useState } from 'react';
import BotonFAColores1 from '../../../components/general/BotonFAColores1';
import VentanaModal from '../../../components/general/VentanaModal';
import Volver from '../../../components/general/Volver';
import CrearAnuncio from '../../../helpers/CrearAnuncio';
import RemoverAnuncio from '../../../helpers/RemoverAnuncio';
import GetAnuncios from '../../../helpers/GetAnuncios';
import EditarAnuncio from '../../../helpers/EditarAnuncio';
import ImagenVistaPrevia from '../../../components/general/ImagenVistaPrevia';
import Anuncio from '../../../components/general/Anuncio';
import Wredirect from '../../../helpers/Wredirect';

const Addanuncio = ({ me, auth }: any) => {
	const [borrado, setBorrado] = useState(false);
	const [imagenes, setImagenes] = useState<any>([]);
	const [imagenesPreview, setImagenesPreview] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [subido, setSubido] = useState(false);
	const [errorMSG, setErrorMSG] = useState<any>(false);
	const [vistaPreviaAnuncio, setVistaPreviaAnuncio] = useState(false);
	const [anuncioIni, setAnuncioIni] = useState({
		nombre: '',
		descripcion: '',
		url: '',
		url_name: '',
		id: '',
	});
	const [loaded, setLoaded] = useState(false);

	const maxImg = 1;

	const handdleImagenes = (e: any) => {
		if (e.target.files.length > maxImg) {
			alert(`Solo se pueden subir ${maxImg} imagenes `);
			return;
		}
		let dataUrls = [];
		for (let i = 0; i < e.target.files.length; i++) {
			dataUrls.push(URL.createObjectURL(e.target.files[i] as any));
		}
		setImagenes([...e.target.files]);
		setImagenesPreview(dataUrls);

		//reset input
		e.target.value = null;
		e.target.files = null;
	};
	const handdleSubirAnuncio = (e: any | React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const nombre = e.target.nombre.value.trim();
		const descripcion = e.target.descripcion.value.trim();
		const url = e.target.url.value.trim();
		const url_name = e.target.urlname.value.trim();
		if (anuncioIni.id) {
			EditarAnuncio({
				nombre,
				descripcion,
				url,
				url_name,
				imagen: imagenes,
				id: anuncioIni.id,
			})
				.then((res) => {
					setSubido(true);
					if (!res.ok) {
						setErrorMSG(res.msg);
					}
					setLoading(false);
				})
				.catch((err) => {
					setSubido(true);
					setErrorMSG(
						'Hubo un error al subir la portada, contacte al administrador'
					);
					setLoading(false);
				});
			return;
		}

		CrearAnuncio({ nombre, descripcion, url, url_name, imagen: imagenes })
			.then((res) => {
				setSubido(true);
				if (!res.ok) {
					setErrorMSG(res.msg);
				}
				setLoading(false);
			})
			.catch((err) => {
				setSubido(true);
				setErrorMSG(
					'Hubo un error al subir la portada, contacte al administrador'
				);
				setLoading(false);
			});
	};

	const handdleDeleteAnuncio = () => {
		setLoading(true);
		RemoverAnuncio(anuncioIni.id)
			.then((res) => {
				if (res.ok) {
					setImagenes([]);
					setImagenesPreview([]);
					setAnuncioIni({ ...anuncioIni, id: '' });
					setBorrado(true);
				}
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	};

	const handdleChange = (...prop: any) => {
		const [name, value] = prop;
		setAnuncioIni({ ...anuncioIni, [name]: value });
	};
	const puedeSubir = !!anuncioIni.nombre;

	useEffect(() => {
		if (!me.admin) return;
		GetAnuncios()
			.then((res) => {
				if (res.anuncios && res.anuncios.length > 0) {
					const {
						nombre,
						descripcion,
						url,
						url_name,
						imagen,
						id,
					} = res.anuncios[0];
					imagen && setImagenesPreview([imagen]);
					setAnuncioIni({ nombre, descripcion, url, url_name, id });
				}
				setLoaded(true);
			})
			.catch((er) => {
				setLoaded(true);
			});
	}, []);
	if (!me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			<Volver />
			<br />
			<br />
			<h1 className="producto__titulo">Borrar Anuncio actual</h1>
			{!loaded && <p>Cargando...</p>}
			{loaded && (
				<BotonFAColores1
					backgroundColor="#f9423a"
					onClick={handdleDeleteAnuncio}
					disabled={anuncioIni.id === ''}
				>
					Borrar anuncio actual
				</BotonFAColores1>
			)}
			{borrado && (
				<VentanaModal
					titulo="Anuncio Borrado"
					onClose={() => {
						setBorrado(false);
					}}
				>
					Anuncio borrado con exito
				</VentanaModal>
			)}
			<br />
			<br />
			<hr />
			<h1 className="producto__titulo">Crear/editar Anuncio</h1>
			{!loaded && <p>Cargando...</p>}
			<br />
			{loaded && (
				<>
					<form onSubmit={handdleSubirAnuncio}>
						<br />
						<div className="LABELINPUT">
							<label htmlFor="nombre">Titulo (Obligatorio)</label>
							<input
								id="nombre"
								type="text"
								defaultValue={anuncioIni.nombre}
								onChange={(e) => handdleChange('nombre', e.target.value)}
							/>
						</div>
						<div className="LABELINPUT">
							<label htmlFor="descripcion">Descripción</label>
							<textarea
								id="descripcion"
								defaultValue={anuncioIni.descripcion}
								onChange={(e) => handdleChange('descripcion', e.target.value)}
							/>
						</div>
						<div className="LABELINPUT">
							<label htmlFor="url">Enlace</label>
							<input
								id="url"
								type="text"
								defaultValue={anuncioIni.url}
								onChange={(e) => handdleChange('url', e.target.value)}
							/>
						</div>
						<div className="LABELINPUT">
							<label htmlFor="urlname">Nombre a mostrar en el enlace</label>
							<input
								id="urlname"
								type="text"
								defaultValue={anuncioIni.url_name}
								onChange={(e) => handdleChange('url_name', e.target.value)}
							/>
						</div>
						<div className="LABELINPUT">
							<label>Imagen, se recomienda imagenes 16:9</label>
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
								onChange={handdleImagenes}
								accept="image/png, image/jpeg"
								style={{ display: 'none' }}
							/>
							{imagenesPreview.length > 0 && (
								<div className="IMAGEPREVIEW">
									<br />
									{imagenesPreview.map((img: any, i: number) => (
										<ImagenVistaPrevia
											key={i}
											id={i}
											src={img}
											alt="imagen"
											onDelete={() => {
												let imgPreviewCopy = [...imagenesPreview];
												imgPreviewCopy.splice(i, 1);
												let imgCopy = [...imagenes];
												imgCopy.splice(i, 1);
												setImagenes(imgCopy);
												setImagenesPreview(imgPreviewCopy);
											}}
										/>
									))}
								</div>
							)}
							<br />
							<BotonFAColores1
								disabled={loading || !puedeSubir}
								backgroundColor="#005eb8"
							>
								{loading ? (
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
									<>
										{puedeSubir ? (
											<>
												Subir Anuncio <i className="fas fa-arrow-up"></i>
											</>
										) : (
											'Faltan campos por llenar'
										)}
									</>
								)}
							</BotonFAColores1>
							<span>&nbsp; &nbsp;</span>
							<BotonFAColores1
								backgroundColor="#48d597"
								onClick={(e: any) => {
									e.preventDefault();
									setVistaPreviaAnuncio(true);
								}}
							>
								<i className="fas fa-eye"></i>
								Vista Previa
							</BotonFAColores1>
							<br />
							<br />
							{subido &&
								(errorMSG ? (
									<VentanaModal
										titulo="Error D:"
										onClose={() => {
											setLoading(false);
											setSubido(false);
											setErrorMSG(false);
										}}
									>
										{errorMSG}
									</VentanaModal>
								) : (
									<VentanaModal
										titulo="Anuncio subido"
										redireccionar="/user/nortesoladm"
									>
										Anuncio subido correctamente
									</VentanaModal>
								))}
						</div>
						{vistaPreviaAnuncio && (
							<Anuncio
								nombre={anuncioIni.nombre}
								descripcion={anuncioIni.descripcion}
								url={anuncioIni.url}
								url_name={anuncioIni.url_name}
								imagen={imagenesPreview ? imagenesPreview[0] : ''}
								test
								onClose={() => {
									setVistaPreviaAnuncio(false);
								}}
							/>
						)}
					</form>
				</>
			)}
		</>
	);
};

export default Addanuncio;
