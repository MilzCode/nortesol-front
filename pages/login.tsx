import React, { useState } from 'react';
import BotonFAColores1 from '../components/general/BotonFAColores1';
import { useRouter } from 'next/router';
import Volver from '../components/general/Volver';
import Firebase from '../firebase';
import { DoLoginFacebook, DoLoginGoogle } from '../helpers/DoLogin';
import Wredirect from '../helpers/Wredirect';
import Link from 'next/link';

const Ingresar = ({ auth }: any) => {
	const router = useRouter();
	if (auth) router.push('/');

	const handdleGoogleSignIn = async () => {
		// window.open('http://localhost:8080/api/auth/google', '_self');
		const token = await Firebase.loginGoogle();
		token && (await DoLoginGoogle(token)) && Wredirect();
	};
	const handdleFacebookSignIn = async () => {
		// window.open('http://localhost:8080/api/auth/facebook', '_self');
		const token = await Firebase.loginFacebook();
		token && (await DoLoginFacebook(token)) && Wredirect();
	};

	return (
		<>
			<Volver />
			<div className="login">
				<div className="login__irRegistro">
					<h3 className="login__titulo">Ingresar</h3>
					<BotonFAColores1
						backgroundColor="#4267b2"
						onClick={handdleFacebookSignIn}
					>
						<i className="fab fa-facebook-f" />
						&nbsp;&nbsp;Ingreso con Facebook
					</BotonFAColores1>
					<br />
					<BotonFAColores1
						backgroundColor="#d34836"
						onClick={handdleGoogleSignIn}
					>
						&nbsp;&nbsp;
						<i className="fab fa-google" />
						&nbsp;&nbsp;Ingreso con Google&nbsp;&nbsp;
					</BotonFAColores1>
					<br />
					<Link href="/contacto" passHref>
						<a className="LINK">Términos y condiciones.</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Ingresar;
