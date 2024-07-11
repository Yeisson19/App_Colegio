import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; 
import { AuthContext } from '../context/AuthContext';

const CustomDrawerContent = (props) => {
  const { user, clearAuthToken } = useContext(AuthContext);

  const rolePermissions = {
    Tutor: ['Inicio', 'Pagos'],
    Docente: ['Inicio', 'Inscripciones', 'Horario', 'Seccion', 'Año Academico'],
    Admin: ['Inicio', 'Materia', 'Seccion', 'Horario', 'Pagos', 'Inscripciones', 'Año Academico']
  };

  const getUserRole = (role) => {
    switch (role) {
      case 1:
        return { name: 'Tutor', permissions: rolePermissions.Tutor };
      case 19:
        return { name: 'Docente', permissions: rolePermissions.Docente };
      case 3:
        return { name: 'Admin', permissions: rolePermissions.Admin };
      default: 
        return { name: 'Desconocido', permissions: [] };
    }
  };

  // Asegúrate de que user esté disponible antes de acceder a sus propiedades
  if (!user) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoSection}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Guardando Token...</Text>
        </View>
      </DrawerContentScrollView>
    );
  }

  const userRole = getUserRole(user.rol);
  const allowedScreens = userRole.permissions;
  const filteredRoutes = props.state.routes.filter(route => allowedScreens.includes(route.name));

  const handleLogout = () => {
    clearAuthToken(); // Llama a la función para eliminar el token y limpiar el contexto de usuario
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} // Reemplaza con la URL del avatar del usuario
          style={styles.avatar}
        />
        <Text style={styles.userol}>{userRole.name}</Text> 
        <Text style={styles.username}>{user.user}</Text>
        {/* <Text style={styles.email}>{user.email}</Text> */}
      </View>

      <DrawerItemList 
        {...props} 
        state={{ 
          ...props.state, 
          routes: filteredRoutes 
        }} 
      />
      <DrawerItem
        label="Cerrar sesión"
        icon={({ color, size }) => (
          <Ionicons name="power" color={color} size={size} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userol: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});

export default CustomDrawerContent;
