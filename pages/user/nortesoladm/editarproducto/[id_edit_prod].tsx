import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EditarProd from '../../../../components/nortesoladm/EditarProd';
import Wredirect from '../../../../helpers/Wredirect';
import Volver from '../../../../components/general/Volver';

//cantidad maxima de imagenes que se pueden subir
const EditarProductoRoute = ({ me }: any) => {
	const router = useRouter();
	const { id_edit_prod } = router.query;
	const [loadId, setLoadId] = useState(false);
	useEffect(() => {
		if (!me.admin) return;
		if (id_edit_prod) {
			setLoadId(true);
		}
	}, [id_edit_prod]);

	if (!me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			{loadId && (
				<>
					<Volver cantPagesBack={2} />
					<h1 className="producto__titulo">Editar Producto</h1>
					<EditarProd me={me} id_edit_prod={id_edit_prod} />
				</>
			)}
		</>
	);
};

export default EditarProductoRoute;
