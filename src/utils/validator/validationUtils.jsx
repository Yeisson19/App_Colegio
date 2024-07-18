// validationUtils.js
import { validateUsername, validatePassword } from './validation.jsx';

function validationComplete(username, password) {
  // Verificar la validación del formulario
  const isUsernameValid = validateUsername(username);
  const isPasswordValid = validatePassword(password);

  // Verificar si hay errores de validación
  if (!isUsernameValid || !isPasswordValid) {
    // Mostrar mensajes de error de validación
    let errorMessage;
    if (!isUsernameValid && !isPasswordValid) {
      errorMessage = 'El formato del usuario y la contraseña no son correctos.';
    } else if (!isUsernameValid) {
      !username ? errorMessage = 'Usuario vacio' : errorMessage = 'formato del usuario no es correcto.';
    } else {
      !password ? errorMessage = 'Contraseña vacio' : errorMessage = 'formato de contraseña no es correcto.';
    }

    return { isValid: false, errorMessage };
  }

  return { isValid: true };
}

export default validationComplete;
