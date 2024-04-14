import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './components/login';
import Materia from './components/Materia';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const onLoginSuccess = (result) => {
    setIsLoggedIn(true);
    setUserData(result);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? <Materia userData={userData} onLogout={handleLogout} /> : <Login onLoginSuccess={onLoginSuccess} />}
    </View>
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
