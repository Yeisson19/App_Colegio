import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavDrawer from './NavDrawer';
import DetailsScreen from '../screens/DetailsSeccion';

const Stack = createNativeStackNavigator();

const SeccionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NavDrawer"
        component={NavDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({
          title: `Detalles de la Sección ${route.params.seccion.secciones}`
        })}
      />
    </Stack.Navigator>
  );
};

export default SeccionStack;
