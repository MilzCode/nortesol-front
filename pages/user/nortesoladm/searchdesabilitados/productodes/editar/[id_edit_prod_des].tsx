import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EditarProd from '../../../../../../components/nortesoladm/EditarProd';
import Wredirect from '../../../../../../helpers/Wredirect';
import BotonFAColores1 from '../../../../../../components/general/BotonFAColores1';
import VentanaModal from '../../../../../../components/general/VentanaModal';
import Volver from '../../../../../../components/general/Volver';
import RemoverProductoDefinitivamente from '../../../../../../helpers/RemoverProductoDefinitivamente';
import { paths } from '../../../../../../utils/constantes';

//cantidad maxima de imagenes que se pueden subir
const EditarProductoRouteDes = ({ me }: any) => {
	const router = useRouter();
	const { id_edit_prod_des } = router.query;
	const [loadId, setLoadId] = useState(false);
	const [
		confirmarBorrarDefinitivamente,
		setConfirmarBorrarDefinitivamente,
	] = useState(false);
	useEffect(() => {
		if (!me.admin) return;
		if (id_edit_prod_des) {
			setLoadId(true);
		}
	}, [id_edit_prod_des]);

	if (!me.admin) {
		Wredirect();
		return null;
	}
	const handdleBorrarDefinitivamente = async () => {
		if (!id_edit_prod_des) return;
		const res = await RemoverProductoDefinitivamente({
			id: id_edit_prod_des.toString(),
		});
		if (!res.ok) {
			alert('Hubo un problema al borrar contacta al administrador');
			return;
		}
		Wredirect(paths.searchDesabilitados);
		alert('borrado con exito');
	};
	return (
		<>
			<Volver cantPagesBack={3} />
			<h1 className="producto__titulo">Editar Producto</h1>
			<br />
			<br />
			{loadId && (
				<>
					<BotonFAColores1
						onClick={() => {
							setConfirmarBorrarDefinitivamente(true);
						}}
						backgroundColor="red"
					>
						Borrar producto Definitivamente
					</BotonFAColores1>
					{confirmarBorrarDefinitivamente && (
						<VentanaModal
							titulo="¿Segur@?"
							onClose={() => {
								setConfirmarBorrarDefinitivamente(false);
							}}
						>
							<BotonFAColores1
								backgroundColor="red"
								onClick={handdleBorrarDefinitivamente}
							>
								Si
							</BotonFAColores1>
						</VentanaModal>
					)}
					<EditarProd me={me} id_edit_prod={id_edit_prod_des} desabilitado />
				</>
			)}
		</>
	);
};

export default EditarProductoRouteDes;
