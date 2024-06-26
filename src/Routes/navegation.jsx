import React, { useContext, useEffect,useState  } from 'react';
import { Button , Alert } from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Importa el ícono de Ionicons
import { AuthContext } from '../context/AuthContext';

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

//---LEER--->La Alerta tiene problema al llamarla por 2 vez.
// const LogoutScreen = ({ navigation }) => {
//   const { clearAuthToken } = useContext(AuthContext);

//     const showAlert = () => {
//       Alert.alert(
//         'Confirmar cierre de sesión',
//         '¿Estás seguro de que deseas cerrar sesión?',
//         [
//           {
//             text: 'Cancelar',
//             onPress: () => {
//               navigation.navigate('Home');
//             },
//             style: 'cancel',
//           },
//           {
//             text: 'Confirmar',
//             onPress: async () => {
//               await clearAuthToken();
//               // navigation.navigate('Login');
//             },
//           },
//         ]
//         // { cancelable: false }
//       );
//     };

//     showAlert();
  
// };

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
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen 
        name="Materia" 
        component={Materia} 
      />
      <Drawer.Screen 
        name="Seccion" 
        component={Seccion} 
        options={{ title: 'Seccion' }}
      />
      <Drawer.Screen 
        name="Horario" 
        component={horario} 
        // initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="Pagos" 
        component={Pagos} 
        // initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="Inscripciones" 
        component={Inscripciones} 
        // initialParams={{ userData }} // Pasar solo userData
      />
      <Drawer.Screen 
        name="AñoScreen" 
        component={Ano_academico} 
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
