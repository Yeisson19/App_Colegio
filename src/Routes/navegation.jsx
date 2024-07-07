import React, { useContext, useEffect,useState  } from 'react';
import { Button , Alert, Image } from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Importa el ícono de Ionicons
import { AuthContext } from '../context/AuthContext';
import homeIcon from '../screens/img/logo.png';
// Screens
import Home from '../screens/Home';
import Materia from '../screens/Materia';
import Seccion from '../screens/Seccion';
import horario from '../screens/horario';
import Pagos from '../screens/Pagos';
import Inscripciones from '../screens/inscripciones';
import Ano_academico from '../screens/ano_academico';


//Sub-Screen
import DetailsScreen from '../screens/DetailsSeccion';

const Drawer = createDrawerNavigator();//nav Screens
const Stack = createNativeStackNavigator();//nav Sub-Screen

const NavDrawer = () => {

  // Logica cerrar Seccion (elimina token)
  const LogoutScreen = () => {
    const { clearAuthToken } = useContext(AuthContext);
  
    React.useEffect(() => {
      const logout = async () => {
        await clearAuthToken();
      };
  
      logout();
    }, []);
  
    return null;
  };
  //-----------------------------------------

  return (
    <Drawer.Navigator 
    // initialRouteName="Seccion"
    >
      <Drawer.Screen
        name="INICIO"
        component={Home}
        options={{
          drawerIcon: () => (
            <Image source={homeIcon} style={{ width: 24, height: 24 }} />
          ),
        }}
      />

      <Drawer.Screen 
        name="Materia" 
        component={Materia} 
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'library' : 'library-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Seccion"
        component={Seccion}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'school' : 'school-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="Horario" 
        component={horario} 
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'time' : 'time-outline'}
              size={size}
              color={color}
            />
          ),
        }}
        // initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="Pagos" 
        component={Pagos} 
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'card' : 'card-outline'}
              size={size}
              color={color}
            />
          ),
        }}
        // initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="Inscripciones" 
        component={Inscripciones} 
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
        // initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="Año Academico" 
        component={Ano_academico} 
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={size}
              color={color}
            />
          ),
        }}
        // initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen
        name="CerrarSesion"
        options={{
          title: 'Cerrar sesión',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name="power"
              size={size}
              color={color}
            />
          ),
        }}
        component={LogoutScreen}
        />

        
    </Drawer.Navigator>
  );
};



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
