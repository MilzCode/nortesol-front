import validarRut from "../utils/validarRut";

export default function validarEditarMisDatos(datos) {
  let errors = {};
  if (!datos.nombre) {
    errors.nombre = "El nombre es requerido";
  }
  if (!datos.rut) {
    errors.rut = "El rut es requerido";
  } else if (!validarRut(datos.rut)) {
    errors.rut = "El rut no es valido";
  }
  if (!datos.celular) {
    errors.celular = "El celular es requerido";
  }
  //regex 9 only numbers digits ej: 123456789 or 987654321
  else if (!/^[0-9]{9}$/.test(datos.celular)) {
    errors.celular = "El celular no es válido";
  }

  //  hay que tener claro que por defecto la contraseña al update son 10 asteriscos **********
  // es solo por cuestion de estetica, por lo que si llegan 10 asteriscos se toma como valida
  // pero en realidad esto signifca que no hara ningun cambio real en la base de datos.
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
