import EditarProd from '../../../components/nortesoladm/EditarProd';
import Wredirect from '../../../helpers/Wredirect';
import Volver from '../../../components/general/Volver';

//cantidad maxima de imagenes que se pueden subir
const EditarProductoRouteDes = ({ me }: any) => {
	if (!me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			<Volver />
			<h1 className="producto__titulo">Crear Producto</h1>
			<EditarProd me={me} create />
		</>
	);
};

export default EditarProductoRouteDes;
