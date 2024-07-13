import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import DrawerContent from './DrawerContent';

import Home from '../screens/Home';
import Materia from '../screens/Materia';
import Seccion from '../screens/Seccion';
import Horario from '../screens/horario';
import Pagos from '../screens/Pagos';
import Inscripciones from '../screens/inscripciones';
import Ano_academico from '../screens/ano_academico';

import {rolePermissions, getUserRole } from '../utils/permissions';

const Drawer = createDrawerNavigator();

const NavDrawer = () => {
  const { user } = useContext(AuthContext);

  const userRole = getUserRole(user.rol);
  const allowedScreens = rolePermissions[userRole.name] || [];

  const filteredScreens = [
    { name: 'Inicio', component: Home, icon: 'home' },
    { name: 'Materia', component: Materia, icon: 'library' },
    { name: 'Seccion', component: Seccion, icon: 'school' },
    { name: 'Horario', component: Horario, icon: 'time' },
    { name: 'Pagos', component: Pagos, icon: 'card' },
    { name: 'Inscripciones', component: Inscripciones, icon: 'person' },
    { name: 'Año Academico', component: Ano_academico, icon: 'calendar' },
  ].filter(screen => allowedScreens.includes(screen.name));

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      {filteredScreens.map((screen, index) => (
        <Drawer.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name={screen.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default NavDrawer;
