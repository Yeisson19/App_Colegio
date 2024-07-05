// src/screens/Codigo.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../services/url'; // Asegúrate de tener la URL base definida

const Codigo = ({navigation ,route}) => {
  const { user } = route.params;
  const [codigo, setCodigo] = useState('');

  const handleConfirmar = async () => {
    console.log(user);
    try {
      const response = await axios.post(`${BASE_URL}/api/mobile/class/confirmar.php`, {
        Usuario: user,
        Codigo: codigo,
      });
 
      if (response.data.success) {
        console.log(response.data.msg); // Puedes cambiar esto para navegar a la siguiente vista
        navigation.navigate('Clave',{user,codigo});
      } else {
        Alert.alert('Error', response.data.msg);
      }
    } catch (error) {
      console.error('Error de confirmación:', error.message);
      Alert.alert('Error', 'Ocurrió un error al confirmar el código.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa el Código</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de 6 dígitos"
        keyboardType="numeric"
        maxLength={6}
        value={codigo}
        onChangeText={setCodigo}
      />
      <Button title="Confirmar" onPress={handleConfirmar} />
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

export default Codigo;
