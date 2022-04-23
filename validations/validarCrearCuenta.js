import validarRut from "../utils/validarRut";

export default function validarCrearCuenta(datos) {
  let errors = {};

  if (!datos.nombre) {
    errors.nombre = "El nombre es requerido";
  }
  if (!datos.rut) {
    errors.rut = "El rut es requerido";
  } else if (!validarRut(datos.rut)) {
    errors.rut = "El rut no es valido";
  }

  if (!datos.email) {
    errors.email = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(datos.email)) {
    errors.email = "El email no es válido";
  }
  if (!datos.celular) {
    errors.celular = "El celular es requerido";
  }
  //regex 9 only numbers digits ej: 123456789 or 987654321
  else if (!/^[0-9]{9}$/.test(datos.celular)) {
    errors.celular = "El celular no es válido";
  }

  if (!datos.region != "") {
    errors.region = "La region es requerida";
  }
  if (!datos.ciudad != "") {
    errors.ciudad = "La ciudad es requerida";
  }
  if (!datos.direccion) {
    errors.direccion = "La direccion es requerida";
  }

  if (!datos.password) {
    errors.password = "La contraseña es requerida";
  } else if (datos.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!datos.password2) {
    errors.password2 = "La confirmación de contraseña es requerida";
  } else if (datos.password !== datos.password2) {
    errors.password2 = "Las contraseñas no coinciden";
  }
  return errors;
}
