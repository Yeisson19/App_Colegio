//  https://www.npmjs.com/package/jwt-decode

import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.log('Error al decodificar el token JWT:',token, error);
    return null;
  }
};
