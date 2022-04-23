/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GetCheckAuth from '../helpers/GetCheckAuth';
import GetMisDatos from '../helpers/GetMisDatos';
import Wredirect from '../helpers/Wredirect';
import Firebase from '../firebase';

import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	/* 
  Mis datos almacena los datos del usuario requeridos en la aplicacion
  mis datos toma 3 valores:
  false. si acaba de ingresar y aun no se conoce si esta autenticado
  null. si acaba de ingresar y se conoce que no esta autenticado
  objeto con datos del usuario. si acaba de ingresar y se conoce que esta autenticado
  */
	const [misDatos, setMisDatos] = useState<any>(false);
	const [appMode, setAppMode] = useState(0);

	//Rutas que no requieren control de acceso. Se recomienda que las rutas con parametros (*) vayan al final
	const rutasPublicas = [
		'/',
		'/login',
		'/contacto',
		'/register',
		'/search',
		'/carrito',
		'/producto/*',
	];
	//ruta actual
	const path = router.asPath.split('?')[0];
	//True si la ruta actual no requiere control de acceso.
	const isPublicRoute = rutasPublicas.some((url) => {
		if (url.includes('*')) {
			const urlSplit = url.split('*').filter((u) => u != '');
			return urlSplit.every((p) => path.includes(p));
		}
		return path === url;
	});

	const redirectToHome = () => {
		Wredirect();
	};

	const [autenticado, setAutenticado] = useState<any>(false);

	useEffect(() => {
		GetCheckAuth()
			.then((res) => {
				if (res) {
					GetMisDatos(res)
						.then((resDatos) => {
							setMisDatos(resDatos);
							setAutenticado(true);
						})
						.catch(() => {
							setMisDatos(null);
							setAutenticado(null);
						});
				} else {
					setAutenticado(null);
				}
			})
			.catch(() => {
				Wredirect('/contacto');
				alert(
					'En este momento no es posible acceder, si el problema persiste contáctenos.'
				);

				setAutenticado(null);
			});
	}, []);

	useEffect(() => {
		setAppMode(0);
		const urlMode1 = path.includes('/nortesoladm/searchdesabilitados');
		urlMode1 && setAppMode(1);
	}, [path]);

	/*Parametros */
	//autenticado contiene si el usuario esta autenticado (auth=true) o no (auth=null) o esta en espera (auth = false)

	try {
		return (
			<>
				<Head>
					<meta name="description" content="NorteSol" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta charSet="UTF-8" />
				</Head>
				<Script src="https://sdk.mercadopago.com/js/v2" />
				<Script src="https://www.mercadopago.com/v2/security.js" />

				{/* 
        En principio no se estara usando context, pero se encuentra en una version anterior de la aplicacion y en la carpeta de firebase. (firebase no operativo)
        Se quito porque no aportaba, y se simplificaba la legibilidad del codigo al no usar context.
        los  parametros y sus nombres, que se estan trabjando entre componentes son los siguientes:
        - misDatos: contiene los datos del usuario en caso de estar autenticado y su rol.
        - auth: contiene si el usuario esta autenticado (auth=true) o no (auth=null) o esta en espera (auth = false) 
          basado en el state.
      */}
				{(autenticado && misDatos) || isPublicRoute ? (
					<Layout
						auth={autenticado}
						path={path}
						appMode={appMode}
						out={() => {
							Firebase.out();
						}}
					>
						<Component
							path={path}
							mode={appMode}
							me={misDatos}
							auth={autenticado}
							{...pageProps}
						/>
					</Layout>
				) : (
					//en los componentes heredados logeadoNorteSol: null es usuario no logeado.
					<Layout auth={autenticado} path={path} mode={appMode}>
						{/* Si no es una ruta que requiera acceso o misDatos aun no recibe respuesta (null u object) retorna cargando... */}
						{isPublicRoute || autenticado !== null ? (
							<p className="CENTERABSOLUTE TEXT1">Cargando...</p>
						) : (
							redirectToHome()
						)}
					</Layout>
				)}
			</>
		);
	} catch (error) {
		Wredirect();
		return null;
	}
}
export default MyApp;
