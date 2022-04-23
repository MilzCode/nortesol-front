import validarRut from "../utils/validarRut";

export default function validarEditarDireccion(datos) {
  let errors = {};

  if (!datos.region != "") {
    errors.region = "La region es requerida";
  }
  if (!datos.ciudad != "") {
    errors.ciudad = "La ciudad es requerida";
  }
  if (!datos.direccion) {
    errors.direccion = "La direccion es requerida";
  }
  return errors;
}
