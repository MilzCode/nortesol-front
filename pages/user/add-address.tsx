import React from 'react';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import Volver from '../../components/general/Volver';
import Wredirect from '../../helpers/Wredirect';

const AddAddress = () => {
	Wredirect();
	// return (
	//   <>
	//     <Volver />
	//     <div className="editAddress">
	//       <form action="" className="editAddress__form">
	//         <h3 className="editAddress__titulo">Añadir dirección</h3>
	//         <p className="TEXT1">Ingrese nueva dirección</p>
	//         <div className="userEdit__input">
	//           <label htmlFor="nombre" className="fas fa-user" />
	//           <input
	//             type="text"
	//             name="nombre"
	//             id="nombre"
	//             placeholder="Nombre ej: Mi casa"
	//           />
	//         </div>
	//         <div className="userEdit__input">
	//           <label htmlFor="region" className="fas fa-map-marker-alt" />
	//           <select name="region" id="region">
	//             <option value="">Seleccione una región</option>
	//             <option value="1">Region 1</option>
	//             <option value="2">Region 2</option>
	//             <option value="3">Region 3</option>
	//           </select>
	//         </div>
	//         <div className="userEdit__input">
	//           <label htmlFor="ciudad" className="fas fa-map-marker" />
	//           <select name="ciudad" id="ciudad">
	//             <option value="">Seleccione una ciudad</option>
	//             <option value="1">Ciudad 1</option>
	//             <option value="2">Ciudad 2</option>
	//             <option value="3">Ciudad 3</option>
	//           </select>
	//         </div>
	//         <div className="userEdit__input">
	//           <label htmlFor="direccion" className="fas fa-home" />
	//           <input
	//             type="text"
	//             name="direccion"
	//             id="direccion"
	//             placeholder="Direccion"
	//           />
	//         </div>
	//         <hr />
	//         <div>
	//           <BotonFAColores1 backgroundColor="#69b3e7">
	//             <i className="fas fa-plus"></i>
	//             Añadir dirección
	//           </BotonFAColores1>
	//         </div>
	//       </form>
	//     </div>
	//   </>
	// );
};

export default AddAddress;
