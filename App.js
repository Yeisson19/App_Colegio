import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import Login from './src/screens/login'; // Asegúrate de que la ruta sea correcta
import SeccionStack from './src/Routes/navegation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);//variable de login
  const [userData, setUserData] = useState(null);//Datos User

  //Inicia Seccion
  const onLoginSuccess = (result) => {
    setIsLoggedIn(true);
    setUserData(result);
  };
  //Cierra Seccion
  const handleLogout = () => { 
    setIsLoggedIn(false); 
    console.log(isLoggedIn);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <SeccionStack userData={userData} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={onLoginSuccess} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
