// src/screens/Clave.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../services/url.jsx'; // Asegúrate de tener la URL base definida

const Clave = ({ navigation, route }) => {
  const { user ,codigo} = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    try {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
          }
      // Aquí puedes agregar más validaciones según tus requisitos (longitud, caracteres especiales, etc.)

      const response = await axios.post(`${BASE_URL}/api/mobile/class/cambiar.php`, {
        Usuario: user,
        Clave: newPassword,
        Code: codigo
      });
   console.log(response.data);

      if (response.data.change) {
        Alert.alert('Mensaje', response.data.msj);
        console.log(response.data.msj); // Puedes cambiar esto para navegar a la siguiente vista
        navigation.navigate('Login');
      } 
      else if(!response.data.success){
        Alert.alert('Error', response.data.msg);
      }
      else {
        Alert.alert('Error', response.data.msj);
      }
      

      // Puedes implementar lógica adicional según la respuesta de la API

    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.message);
      Alert.alert('Error', 'Ocurrió un error al cambiar la contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña(4-10 caracteres)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Guardar" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Clave;
