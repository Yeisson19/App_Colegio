import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://decorous-chin.000webhostapp.com/api/login.php', {
        user: username,
        password: password,
      });

      console.log(response.data);

      // Verifica si la Respuesta Indica un Inicio de Sesión Exitoso
      if (response.data && response.data.entrada == true) {
        Alert.alert('Bienvenido!!', 'Inicio de sesión exitoso');
        onLoginSuccess(response.data.resultado); // Llama a la función proporcionada desde App.js con el resultado
      } else {
        console.warn(response.data); // Muestra un mensaje de error si el inicio de sesión falla
      }

    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
      Alert.alert('Error', 'Inicio de sesión fallido. Verifica tus credenciales.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={18} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={18} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 85,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
});

export default Login;
