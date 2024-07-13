import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { decodeToken } from '../auth/JWT_Decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al montar el componente, intenta recuperar el token almacenado
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('token');
        if (storedToken) {
          setToken(storedToken);
          const decodedToken = decodeToken(storedToken);
          if (decodedToken && decodedToken.resultado) {
            setUser(decodedToken.resultado);
          } else {
            console.log('El token decodificado no tiene la estructura esperada:', decodedToken);
          }
        }
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
      } else {
        console.log('El token decodificado no tiene la estructura esperada:', decodedToken);
      }
    } catch (error) {
      console.log('Error al guardar el token:', error);
    }
  };

  const clearAuthToken = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setToken(null);
      setUser(null);
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
