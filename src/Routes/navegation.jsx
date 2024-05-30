import * as React from 'react';
import { Button } from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Importa el ícono de Ionicons

// Screens
import Home from '../screens/Home';
import Materia from '../screens/Materia';
import Seccion from '../screens/Seccion';
import horario from '../screens/horario';
import Pagos from '../screens/Pagos';
import Inscripciones from '../screens/inscripciones';
//Sub-Screen
import DetailsScreen from '../screens/DetailsSeccion';

const Drawer = createDrawerNavigator();//nav Screens
const Stack = createNativeStackNavigator();//nav Sub-Screen

const NavDrawer = ({ userData, navigation }) => {

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('CerrarSesion')}
          title="Cerrar sesión"
          color="#000"
        />
      ),
    });
  }, [navigation]);

  return (
    <Drawer.Navigator initialRouteName="Seccion">
      <Drawer.Screen name="HomeScreen" component={Home} />
      <Drawer.Screen 
        name="MateriaScreen" 
        component={Materia} 
        initialParams={{ userData }} 
      />
      <Drawer.Screen 
        name="SeccionScreen" 
        component={Seccion} 
        options={{ title: 'Seccion' }}
      />
      <Drawer.Screen 
        name="HorarioScreen" 
        component={horario} 
        initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="PagosScreen" 
        component={Pagos} 
        initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="InscripcionesScreen" 
        component={Inscripciones} 
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
        component={LogoutScreen}
      />
    </Drawer.Navigator>
  );
};

const LogoutScreen = ({ navigation }) => {
  return (
    <DrawerItem
      label="Cerrar sesión"
      onPress={() => navigation.navigate('CerrarSesion')}
    />
  );
};

const SeccionStack = ({ userData }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={NavDrawer}
        options={{ headerShown: false }}
        initialParams={{ userData }}
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
