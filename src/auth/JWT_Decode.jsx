//  https://www.npmjs.com/package/jwt-decode

import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token specified: must be a string');
    }
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.log('Error al decodificar el token JWT:',token, error);
    return null;
  }
}; 

export const ExpireToken = (token) => {
  const decodedToken = decodeToken(token);
  let currentTime;
  if (decodedToken) {  currentTime = Math.floor(Date.now() / 1000);}
  return decodedToken.exp < currentTime ? true : false; // Indicar que el token no ha expirado
};
