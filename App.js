import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './src/screens/login';
import Nav_Drawer from './src/Routes/navegation';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const onLoginSuccess = (result) => {
    setIsLoggedIn(true);
    setUserData(result);
  };

  const handleLogout = () => { 
    setIsLoggedIn(false); 
    console.log(isLoggedIn);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? <Nav_Drawer userData={userData} onLogout={handleLogout} /> : <Login onLoginSuccess={onLoginSuccess} />}
      </NavigationContainer>
  );
}

{/* <Materia userData={userData} onLogout={handleLogout} /> */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});