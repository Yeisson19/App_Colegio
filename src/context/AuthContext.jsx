import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Al montar el componente, intenta recuperar el token almacenado
    (async () => {
      const storedToken = await SecureStore.getItemAsync('token');
      if (storedToken) {
        setToken(storedToken);
      }
    })();
  }, []);

  const saveAuthToken = async (newToken) => {
    try {
      await SecureStore.setItemAsync('token', newToken);
      setToken(newToken);
    } catch (error) {
      console.log('Error al guardar el token:', error);
    }
  };

  const clearAuthToken = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setToken(null);
    } catch (error) {
      console.log('Error al borrar el token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, saveAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
