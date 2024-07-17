import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Button, Card } from 'react-native-paper';
import { BASE_URL } from '../../services/url.jsx';
import { Encriptar } from '../../auth/authentication.jsx';

const Recuperar = ({ navigation }) => {
  const [user, setUser] = useState('');

  const handleRecuperar = async () => {
    const encryptedUsername = Encriptar(user); 
    try {
      const response = await axios.post(`${BASE_URL}/api/mobile/class/recuperar.php`, {
        User: encryptedUsername
      });
      const data = response.data;
      console.log(data);
      if (data.success) {
        navigation.navigate('Code', { user });
      } else {
        Alert.alert('Error', data.msg);
      }
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      Alert.alert('Error', 'Ocurrió un error al recuperar la contraseña.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <Text style={styles.subtitle}>Ingresa tu nombre de usuario para recuperar tu contraseña.</Text>
        <Card style={styles.card}>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={18} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              placeholderTextColor="#a0a0a0"
              value={user}
              onChangeText={setUser}
              selectionColor="#06BE99" // Color del cursor
              underlineColorAndroid="transparent" // Oculta la línea de abajo en Android
            />
          </View>
          <Button 
            mode="contained" 
            onPress={handleRecuperar}
            style={styles.recuperarButton}
            contentStyle={styles.recuperarButtonContent}
            labelStyle={styles.recuperarButtonText} // Estilo del texto del botón
          >
            Enviar
          </Button>
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
  recuperarButton: {
    backgroundColor: '#06BE99',
    paddingVertical: windowHeight * 0.015, // Ajuste del tamaño vertical del botón
    paddingHorizontal: windowWidth * 0.05, // Ajuste del tamaño horizontal del botón
    borderRadius: 20, // Botón ovalado
    marginTop: windowHeight * 0.02, // Ajuste del margen superior
  },
  recuperarButtonContent: {
    height: windowHeight * 0.06,
  },
  recuperarButtonText: {
    fontSize: windowWidth * 0.045, // Tamaño del texto del botón
  },
});

export default Recuperar;
