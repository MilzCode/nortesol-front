/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import Volver from '../../components/general/Volver';
import useValidacion from '../../hooks/useValidation';
import formatoRut from '../../utils/formatoRut';
import validarEditarDireccion from '../../validations/validarEditarDireccion';
import RegionesYComunas from '../../utils/RegionesYComunas';
import VentanaModal from '../../components/general/VentanaModal';
import EditarMe from '../../helpers/EditarMe';

const ciudadesInicial: string[] = [];
const EditAddress = ({ me }: any) => {
	const [region, setRegion] = React.useState(false);
	const [envio, setEnvio] = React.useState(false);
	const [ciudades, setCiudades] = React.useState(ciudadesInicial);
	const [passwordOriginalState, setPasswordOriginalState] = React.useState('');

	const STATE_INIT = {
		region: me.region,
		ciudad: me.ciudad,
		direccion: me.direccion,
	};
	const STATE_INIT_ERR = {
		region: '',
		ciudad: '',
		direccion: '',
	};
	//recargo la lista de ciudades para poder seleccionar
	useEffect(() => {
		getCiudades('');
		getCiudades(valores.region, true);
		sendChange(STATE_INIT);
	}, []);

	const actualizarDatos = async () => {
		if (!region) {
			setEnvio(true);
			return;
		}
		const res = await EditarMe({
			password_original: passwordOriginalState,
			region: valores.region,
			ciudad: valores.ciudad,
			direccion: valores.direccion,
			miId: me.uid,
		});
		if (!res.ok) {
			alert('No se pudo realizar cambios');
			return;
		}

		setEnvio(true);
		return true;
	};
	const {
		valores,
		errores,
		handleSubmit,
		handleChange,
		handleBlur,
		sendChange,
	} = useValidacion(
		STATE_INIT,
		validarEditarDireccion,
		actualizarDatos,
		STATE_INIT_ERR
	);

	const getCiudades = (region: string, first?: boolean) => {
		if (region == '') {
			setCiudades([]);
			sendChange({ ciudad: '', region: '' });
			return;
		}
		if (region === valores.region && !first) {
			return;
		}
		const regionEncontrada = RegionesYComunas.find((r) => r.name === region);
		if (regionEncontrada) {
			setCiudades(regionEncontrada.communes);
			return;
		}

		setCiudades([]);
		sendChange({ ciudad: '', region: '' });
		return;
	};

	return (
		<>
			{envio && (
				<VentanaModal titulo="Regresando..." redireccionar="/user" reload>
					{region &&
						'Se modificaron sus datos de envio. Cierre esta ventana para volver'}
					{!region && 'Cierre esta ventana para volver'}
				</VentanaModal>
			)}
			<Volver />
			<div className="editAddress">
				<form className="editAddress__form" onSubmit={handleSubmit}>
					<h3 className="editAddress__titulo">Editar: Dirección de envio</h3>
					<p className="TEXT1">Seleccione datos a cambiar</p>
					{/* <div className="userEdit__input">
            <label htmlFor="nombre" className="fas fa-user" />
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre ej: Mi casa"
              disabled={!nombre}
            />
            <input
              type="checkbox"
              name="nombrecheck"
              id="nombrecheck"
              onChange={() => setNombre(!nombre)}
            />
          </div> */}
					<div className="userEdit__input">
						<label htmlFor="region" className="fas fa-map-marker-alt" />
						<select
							name="region"
							id="region"
							disabled={!region}
							onChange={(e) => {
								handleChange(e);
								getCiudades(e.target.value);
							}}
							onBlur={handleBlur}
						>
							<option value="" onClick={() => sendChange({ region: '' })}>
								Seleccione una región
							</option>
							{RegionesYComunas.map((region: any) =>
								region.name === me.region ? (
									<option key={region.name} value={region.name} selected>
										{region.name}
									</option>
								) : (
									<option key={region.name} value={region.name}>
										{region.name}
									</option>
								)
							)}
						</select>
						<input
							type="checkbox"
							name="regioncheck"
							id="regioncheck"
							onChange={() => {
								region && sendChange(STATE_INIT);
								errores.region = '';
								errores.ciudad = '';
								errores.direccion = '';
								setRegion(!region);
							}}
						/>
					</div>
					<div className="userEdit__input">
						<label htmlFor="ciudad" className="fas fa-map-marker" />
						<label htmlFor="ciudad" className="fas fa-map-marker" />
						<select
							name="ciudad"
							id="ciudad"
							disabled={!region}
							onChange={handleChange}
							onBlur={handleBlur}
						>
							<option value="">Seleccione una ciudad</option>
							{ciudades.map((ciudad: string) =>
								me.ciudad === ciudad ? (
									<option key={ciudad} value={ciudad} selected>
										{ciudad}
									</option>
								) : (
									<option key={ciudad} value={ciudad}>
										{ciudad}
									</option>
								)
							)}
						</select>
						<div />
					</div>
					<div className="userEdit__input">
						<label htmlFor="direccion" className="fas fa-home" />
						<input
							type="text"
							name="direccion"
							id="direccion"
							placeholder="Direccion"
							disabled={!region}
							value={valores.direccion}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<div />
					</div>
					{/* <div className="userEdit__input">
						<label htmlFor="passwordoriginal" className="fas fa-lock" />
						<input
							type="password"
							name="passwordoriginal"
							id="passwordoriginal"
							placeholder="Contraseña Actual"
							onChange={(e: any) => {
								setPasswordOriginalState(e.target.value);
							}}
						/>
						<div />
					</div> */}
					<div className="ERRFORM">
						<ul className="register__errores">
							{errores.region && (
								<li>
									<i className="fas fa-exclamation-circle" />
									{errores.region}
								</li>
							)}
							{errores.ciudad && (
								<li>
									<i className="fas fa-exclamation-circle" />
									{errores.ciudad}
								</li>
							)}
							{errores.direccion && (
								<li>
									<i className="fas fa-exclamation-circle" />
									{errores.direccion}
								</li>
							)}
						</ul>
					</div>
					<hr />
					<div>
						<BotonFAColores1 backgroundColor="#48d597">
							<i className="fas fa-pen-square"></i>
							Modificar datos seleccionados
						</BotonFAColores1>
					</div>
				</form>
			</div>
		</>
	);
};

export default EditAddress;
