import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/screens/login'; 
import SeccionStack from './src/Routes/navegation';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);//variable de login
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
    <PaperProvider>
    <NavigationContainer>
      {isLoggedIn ? (
        <SeccionStack userData={userData} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={onLoginSuccess} />
      )}
    </NavigationContainer>
    </PaperProvider>
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
