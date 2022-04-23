import React, { useState } from 'react';
import BotonFAColores1 from '../../../components/general/BotonFAColores1';
import VentanaModal from '../../../components/general/VentanaModal';
import Volver from '../../../components/general/Volver';
import CrearPortada from '../../../helpers/CrearPortada';
import Wredirect from '../../../helpers/Wredirect';

const maxImg = 1;

const AddPortada = ({ me, auth }: any) => {
	const [imagenes, setImagenes] = useState<any>([]);
	const [imagenesPreview, setImagenesPreview] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [subido, setSubido] = useState(false);
	const [errorMSG, setErrorMSG] = useState<any>(false);

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
	const handdleSubirPortada = (e: any | React.FormEvent) => {
		setLoading(true);
		e.preventDefault();
		const nombre = e.target.nombre.value;
		const descripcion = e.target.descripcion.value;
		const url = e.target.url.value;
		CrearPortada({ nombre, descripcion, url, imagen: imagenes })
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
	const puedeSubir = imagenes.length > 0;
	if (!me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			<Volver />
			<h1 className="producto__titulo">Crear Portada</h1>
			<br />
			<form onSubmit={handdleSubirPortada}>
				<br />
				<div className="LABELINPUT">
					<label htmlFor="nombre">Nombre (opcional)</label>
					<input id="nombre" type="text" />
				</div>
				<div className="LABELINPUT">
					<label htmlFor="descripcion">Descripción (opcional)</label>
					<textarea id="descripcion" />
				</div>
				<div className="LABELINPUT">
					<label htmlFor="url">Enlace (opcional)</label>
					<input id="url" type="text" />
				</div>
				<div className="LABELINPUT">
					<label>Imagen (obligatorio), se recomienda imagenes 16:9</label>
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
							{imagenesPreview.map((img: any, i: number) => {
								return <img key={i} src={img} alt="imagen" />;
							})}
						</div>
					)}
					<br />

					<BotonFAColores1 disabled={loading || !puedeSubir}>
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
										Subir Portada <i className="fas fa-arrow-up"></i>
									</>
								) : (
									'Faltan campos por llenar'
								)}
							</>
						)}
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
								titulo="Portada Subida"
								redireccionar="/user/nortesoladm"
							>
								Portada subida correctamente
							</VentanaModal>
						))}
				</div>
			</form>
		</>
	);
};

export default AddPortada;
