import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Volver = ({ url = '', cantPagesBack = 1 }) => {
	const router = useRouter();
	const path = router.asPath.split('?')[0];
	const [pathAnterior, setPathAnterior] = useState('/');

	useEffect(() => {
		if (url) {
			setPathAnterior(url);
		} else {
			let pathAnteriorCopy = '/';
			try {
				if (cantPagesBack <= 1) {
					cantPagesBack = 1;
				}
				pathAnteriorCopy = path.split('/').slice(0, -cantPagesBack).join('/');
			} catch (error) {
				pathAnteriorCopy = '/';
			}
			if (pathAnteriorCopy) {
				setPathAnterior(pathAnteriorCopy);
			}
		}
	}, []);
	return (
		<div className="volverBoton NOSELECT">
			<Link passHref href={pathAnterior}>
				<a>
					<span className="volverBoton__container">
						<i className="fas fa-level-up-alt" />
						<span>Volver</span>
					</span>
				</a>
			</Link>
		</div>
	);
};

export default Volver;
