import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/other/login'
import Recuperar from '../screens/other/Recuperar';
import Codigo from '../screens/other/Codigo';
import Clave from '../screens/other/Clave';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Recuperar} />
      <Stack.Screen name="Code" component={Codigo} />
      <Stack.Screen name="Clave" component={Clave} />
    </Stack.Navigator>
  );
};

export default AuthStack;
