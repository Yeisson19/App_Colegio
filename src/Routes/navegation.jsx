import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator,DrawerItem } from '@react-navigation/drawer';
import { useNavigation} from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Importa el ícono de FontAwesome

// Screens
import Screen1 from '../screens/Home';
import Screen2 from '../screens/Prueba';
import Materia from '../screens/Materia';
import horario from '../screens/horario';
const Drawer = createDrawerNavigator();

const Nav_Drawer = ({ userData, onLogout }) => {

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Screen1} />
      <Drawer.Screen name="Screen2" component={Screen2} />
      <Drawer.Screen 
        name="Materia" 
        component={Materia} 
        initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="Horario" 
        component={horario} 
        initialParams={{ userData }} // Pasar solo userData
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
        >
        {() => (
          <DrawerItem
          label="Cerrar sesión"
          onPress={onLogout}
          />
        )}
      </Drawer.Screen>


       
    </Drawer.Navigator>
  );
}


export default Nav_Drawer;
