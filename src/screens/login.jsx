// Login.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import validationComplete from '../utils/validator/validationUtils.jsx'; 
import { BASE_URL } from '../services/url.jsx';
import { Desencriptar, Encriptar } from '../auth/authentication.jsx';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { saveAuthToken } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const validationResult = validationComplete(username, password);
      if (!validationResult.isValid) throw new Error(validationResult.errorMessage);

      const encryptedUsername = Encriptar(username);
      const encryptedPassword = Encriptar(password);

      const response = await axios.post(`${BASE_URL}/api/login.php`, {
        user: encryptedUsername,
        password: encryptedPassword
      });

        // Maneja la respuesta del servidor
        console.log(response.data);

        // Desencriptar los datos recibidos
        const entrada = Desencriptar(response.data.entrada);
        const token = Desencriptar(response.data.token);
    
    // Aquí tienes los datos desencriptados
    if (entrada && token) {
        Alert.alert('¡Bienvenido!', 'Inicio de sesión exitoso');
        saveAuthToken(token);
      } else {
        console.warn(response.data.msg);
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
      Alert.alert('Error', 'Inicio de sesión fallido. Verifica tus credenciales.');
    }

    setIsLoading(false);
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
            onChangeText={setUsername}
            // onChangeText={(text) => {
            //   if (text.length <= 10) {
            //     const isValid = /^[0-9A-Za-z\u002A\u002E\u00F1\u00D1\u00D1\u00F1]*$/.test(text);
            //     if (isValid) {
            //       setUsername(text);
            //     }
            //   }
            // }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={18} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button 
          title="Iniciar sesión"
          onPress={handleLogin}
          disabled={isLoading} 
        />
        {isLoading && <ActivityIndicator style={styles.spinner} color="#36B5A6" size="small" />} 
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
