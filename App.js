import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

import Login from './src/screens/login';
import SeccionStack from './src/Routes/navegation';

const Main = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      {token ? (
        <SeccionStack />
      ) : (
        <Login />
      )}
    </>
  );
};

export default function App() {
  return (
    //<PaperProvider> para que funcione los componenetes de 'react-native-paper'
     // <AuthProvider> para que funciones la logica del token en /context/AuthContext 
      //  <NavigationContainer> importante para que la navegacion se vea
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </AuthProvider>
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
