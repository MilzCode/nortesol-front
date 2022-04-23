export default function validarLogin(datos) {
  let errors = {};

  if (!datos.email) {
    errors.email = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(datos.email)) {
    errors.email = "El email no es válido";
  }
  if (!datos.password) {
    errors.password = "La contraseña es requerida";
  } else if (datos.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }
  return errors;
}
