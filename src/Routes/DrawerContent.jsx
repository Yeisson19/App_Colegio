import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { getUserRole } from '../utils/permissions';

const DrawerContent = (props) => {
  const { user, clearAuthToken } = useContext(AuthContext);
  const userRole = user ? getUserRole(user.rol) : null;
  
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.userRole}>{userRole.name}</Text>
        <Text style={styles.username}>{user?.user}</Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Cerrar sesión"
        icon={({ color, size }) => (
          <Ionicons name="power" color={color} size={size} />
        )}
        onPress={clearAuthToken}
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
  userRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DrawerContent;
