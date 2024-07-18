import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { decodeToken ,ExpireToken } from '../auth/JWT_Decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Al montar el componente, intenta recuperar el token almacenado
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('token');//Obtener Token del almancenamiento
        if (storedToken) {
          const ExpToken = ExpireToken(storedToken);//Consulta si expiro el token
          if(!ExpToken){
            setToken(storedToken);//Guarda
            const decodedToken = decodeToken(storedToken);//Decodifica informacion
              if(decodedToken.resultado){
                setUser(decodedToken.resultado);//Guarda
                checkTokenExpiration(storedToken); // Iniciar verificación periódica de expiración
              } 
          }
          else{
            console.log('El token ha expirado');
            await clearAuthToken();// Limpiar el token si ha expirado
          }
            
        } else { console.log("No hay un token almacenado");} 
      } catch (error) {
        console.log('Error al recuperar el token almacenado:', error);
      }
    };

    loadToken();
  }, []);

  const saveAuthToken = async (newToken) => {
    try {
      await SecureStore.setItemAsync('token', newToken);
      setToken(newToken);
      const decodedToken = decodeToken(newToken);
      if (decodedToken && decodedToken.resultado) {
        console.log('Datos decodificados del token:', decodedToken.resultado);
        setUser(decodedToken.resultado);
        checkTokenExpiration(newToken); // Iniciar verificación periódica de expiración
      } else {
        console.log('El token decodificado no tiene la estructura esperada:', decodedToken);
      }
    } catch (error) {
      console.log('Error al guardar el token:', error);
    }
  };
// ***? NOTA: LA HORA DEL SERVIDOR(COMPUTO) Y CLIENTE(TLF) SEAN IGUALES
const checkTokenExpiration = (token) => {
  const StoredToken = token;
  const id = setInterval(() => {
    // let n=0;
    // console.log("Verificando expiración del token...",n);
    if (ExpireToken(StoredToken)) {
      clearAuthToken(); // Limpiar el token si ha expirado
      clearInterval(id); // Limpiar el intervalo
    }
  }, 300000); // 300000ms = 5 minutos consulta si el token expiro
  setIntervalId(id); // Guardar la referencia del intervalo
};

  const clearAuthToken = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setToken(null);
      setUser(null);
      if (intervalId) {
        clearInterval(intervalId); // Detener el intervalo
        setIntervalId(null); // Limpiar la referencia del intervalo
      }
    } catch (error) {
      console.log('Error al borrar el token:', error);
    }
  };
  // clearAuthToken();
  return (
    <AuthContext.Provider value={{ token, user, saveAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
