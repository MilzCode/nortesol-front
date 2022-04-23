import React from 'react';
import Link from 'next/link';
import Volver from '../../../components/general/Volver';
import { paths } from '../../../utils/constantes';
import Wredirect from '../../../helpers/Wredirect';
import BotonFAColores1 from '../../../components/general/BotonFAColores1';

const nortesoladm = ({ auth, me }: any) => {
	if (!auth || !me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			<Volver />
			<div>
				<br />
				<Link href="/user/nortesoladm/addproduct" passHref>
					<BotonFAColores1 backgroundColor="#48d597">
						Crear Producto
					</BotonFAColores1>
				</Link>
				<br />
				<br />
				<Link href="/user/nortesoladm/addportada" passHref>
					<BotonFAColores1 backgroundColor="#005eb8">
						Crear Portada
					</BotonFAColores1>
				</Link>
				<br />
				<br />
				<Link href="/user/nortesoladm/removeportada" passHref>
					<BotonFAColores1 backgroundColor="#00a5df">
						Remover Portada
					</BotonFAColores1>
				</Link>
				<br />
				<br />
				<Link href="/user/nortesoladm/addanuncio" passHref>
					<BotonFAColores1 backgroundColor="#f9e547">Anuncio</BotonFAColores1>
				</Link>
				<br />
				<br />
				<Link href={paths.searchDesabilitados} passHref>
					<BotonFAColores1 backgroundColor="#f9423a">
						Ver Productos desabilitados
					</BotonFAColores1>
				</Link>
				<br />
				<br />
				<Link href="/user/nortesoladm/addmarca" passHref>
					<BotonFAColores1 backgroundColor="#ff6a39">
						Crear Marcas
					</BotonFAColores1>
				</Link>
				<br />
				<br />
				<Link href="/user/nortesoladm/addcategoria" passHref>
					<BotonFAColores1 backgroundColor="#ea5c90">
						Crear Categorias
					</BotonFAColores1>
				</Link>
				<br />
				<br />
			</div>
		</>
	);
};

export default nortesoladm;
