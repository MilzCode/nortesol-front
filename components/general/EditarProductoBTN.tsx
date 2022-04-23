import { paths } from '../../utils/constantes';
import Link from 'next/link';

const EditarProductoBTN = ({ id_edit_prod = '', desabilitado = false }) => {
	return (
		<Link
			href={
				(!desabilitado ? paths.editarProducto : paths.editarProductoDes) +
				'/' +
				id_edit_prod
			}
			passHref
		>
			<a>
				<div className="editarBTN NOSELECT">
					<span>
						<i className="fas fa-pencil" />
						<span>Editar</span>
					</span>
				</div>
			</a>
		</Link>
	);
};

export default EditarProductoBTN;
