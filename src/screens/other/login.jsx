// Login.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Button, Card } from 'react-native-paper';
import validationComplete from '../../utils/validator/validationUtils.jsx';
import { validateUsername,validatePassword } from '../../utils/validator/validation.jsx'; 
import { BASE_URL } from '../../services/url.jsx';
import { Desencriptar, Encriptar } from '../../auth/authentication.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameBorderColor, setUsernameBorderColor] = useState('#ccc');
  const [passwordBorderColor, setPasswordBorderColor] = useState('#ccc');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
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

      console.log(response.data);

      const token = Desencriptar(response.data.token);

      if (response.data.entrada && token) {
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
  //Cambio de color a los input
  const handleUsernameChange = (text) => {
    setUsername(text);
    setUsernameBorderColor(validateUsername(text) ? 'green' : 'red');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordBorderColor(validatePassword(text) ? 'green' : 'red');
  };
  //Ver Contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Por favor inicia sesión para continuar.</Text>
        <Card style={styles.card}>
        <View style={[styles.inputContainer, { borderColor: usernameBorderColor }]}>
            <Ionicons name="person" size={18} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              placeholderTextColor="#a0a0a0"
              value={username}
              onChangeText={handleUsernameChange}
              // onChangeText={setUsername}
              selectionColor="#06BE99" // Color del cursor
              underlineColorAndroid="transparent" // Oculta la línea de abajo en Android
            />
          </View>
          <View style={[styles.inputContainer, { borderColor: passwordBorderColor }]}>
            <Ionicons name="lock-closed" size={18} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#a0a0a0"
              secureTextEntry={!showPassword} // Mostrar u ocultar contraseña según estado
              value={password}
              onChangeText={handlePasswordChange}
              // onChangeText={setPassword}
              selectionColor="#06BE99" // Color del cursor
              underlineColorAndroid="transparent" // Oculta la línea de abajo en Android
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordToggleIcon}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#666" />
            </TouchableOpacity>
          </View>
          <Button 
            mode="contained" 
            onPress={handleLogin}
            disabled={isLoading} 
            style={styles.loginButton}
            contentStyle={styles.loginButtonContent}
            labelStyle={styles.loginButtonText} // Estilo del texto del botón
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : 'Iniciar Sesión'}
          </Button>
          <Text style={styles.signUpText}>
            ¿Olvidaste tu contraseña? <Text onPress={() => navigation.navigate('SignUp')} style={styles.forgotLink}>Recuperar</Text>
          </Text>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: '100%',
  },
  title: {
    fontSize: windowWidth * 0.08,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: windowHeight * 0.02,
  },
  subtitle: {
    fontSize: windowWidth * 0.05,
    color: '#a0a0a0',
    marginBottom: windowHeight * 0.03,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight * 0.03,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8, // Borde redondeado
    borderWidth: 1, // Borde
    borderColor: '#ccc', // Color del borde
    position: 'relative', // Para posicionar el icono en el input
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: windowWidth * 0.04,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#06BE99',
    paddingVertical: windowHeight * 0.015, // Ajuste del tamaño vertical del botón
    paddingHorizontal: windowWidth * 0.05, // Ajuste del tamaño horizontal del botón
    borderRadius: 20, // Botón ovalado
    marginTop: windowHeight * 0.02, // Ajuste del margen superior
  },
  loginButtonContent: {
    height: windowHeight * 0.06,
  },
  loginButtonText: {
    fontSize: windowWidth * 0.045, // Tamaño del texto del botón
  },
  signUpText: {
    marginTop: windowHeight * 0.02, // Ajuste del margen superior
    textAlign: 'center',
    color: '#a0a0a0',
    fontSize: windowWidth * 0.04,
  },
  forgotLink: {
    color: '#06BE99',
    fontWeight: 'bold',
  },
  passwordToggleIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default Login;
