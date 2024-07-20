import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { getUserRole } from '../utils/permissions';

const DrawerContent = (props) => {
  const { user, clearAuthToken } = useContext(AuthContext);

  // Define las rutas de las imágenes
  const avatarImages = {
    Admin: require('../icon/Admin.png'),
    Docente: require('../icon/Docente.png'),
    Tutor: require('../icon/Tutor.png'),
    Desconocido: require('../icon/Default.png'),
  };

  // Obtiene el rol del usuario y el avatar correspondiente
  const userRole = user ? getUserRole(user.rol) : { name: 'Desconocido', avatar: avatarImages.Desconocido };
  const avatarSource = avatarImages[userRole.name] || avatarImages.Desconocido;

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.userInfoSection}>
        <Image
          source={avatarSource}
          style={styles.avatar}
        />
        <Text style={styles.userRole}>{userRole.name}</Text>
        <Text style={styles.username}>{user?.user}</Text>
      </View>

      <View style={styles.menu}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Cerrar sesión"
          icon={({ color, size }) => (
            <Ionicons name="power" color={color} size={size} />
          )}
          onPress={clearAuthToken}
          style={styles.logoutItem}
          labelStyle={styles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  userInfoSection: {
    padding: 20,
    backgroundColor: '#EAF7F1', // Color de fondo revisado
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#BDF3D4', // Color de borde revisado
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userRole: {
    fontSize: 16,
    color: '#2FB4A6', // Color de texto revisado
    fontWeight: '500',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2FB4A6', // Color de texto revisado
  },
  menu: {
    flex: 1,
    paddingTop: 10,
  },
  logoutItem: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#BDF3D4', // Color de borde de logout revisado
  },
  logoutLabel: {
    fontSize: 16,
    color: '#d32f2f',
  },
});

export default DrawerContent;
