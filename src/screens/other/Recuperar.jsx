import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../services/url.jsx';
import { Desencriptar, Encriptar } from '../../auth/authentication.jsx';

const Recuperar = ({ navigation }) => {
  const [user, setUser] = useState('');

  const handleRecuperar = async () => {
    const encryptedUsername = Encriptar(user); 
    try {
      const response = await axios.post(`${BASE_URL}/api/mobile/class/recuperar.php`, {
        User: encryptedUsername
      });
      const data = response.data;

      if (data.success) {
        navigation.navigate('Code',{user});
      } else {
        Alert.alert('Error', data.msg);
      }
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      Alert.alert('Error', 'Ocurrió un error al recuperar la contraseña.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre de usuario"
        value={user}
        onChangeText={setUser}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title="Enviar" onPress={handleRecuperar} />
    </View>
  );
};

export default Recuperar;
