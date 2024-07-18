import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { Button, Card } from 'react-native-paper';
import { BASE_URL } from '../../services/url.jsx';
import { Encriptar } from '../../auth/authentication.jsx';

const Clave = ({ navigation, route }) => {
  const { user, codigo } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    const encryptedUsername = Encriptar(user);
    const encryptedNewPassword = Encriptar(newPassword);
    const encryptedCode = Encriptar(codigo);

    try {
      const response = await axios.post(`${BASE_URL}/api/mobile/class/cambiar.php`, {
        Usuario: encryptedUsername,
        Clave: encryptedNewPassword,
        Code: encryptedCode,
      });

      console.log(response.data);

      if (response.data.change) {
        Alert.alert('Mensaje', response.data.msj);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.msg);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.message);
      Alert.alert('Error', 'Ocurrió un error al cambiar la contraseña.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Cambiar Contraseña (4-10 caracteres)</Text>
        <Card style={styles.card}>
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
          <Button 
            mode="contained" 
            onPress={handleChangePassword}
            style={styles.saveButton}
            contentStyle={styles.saveButtonContent}
            labelStyle={styles.saveButtonText}
          >
            Guardar
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
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  input: {
    height: windowWidth * 0.12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: windowWidth * 0.045,
    paddingHorizontal: 10,
    marginBottom: windowHeight * 0.03,
  },
  saveButton: {
    backgroundColor: '#06BE99',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 20,
    marginTop: windowHeight * 0.02,
  },
  saveButtonContent: {
    height: windowHeight * 0.06,
  },
  saveButtonText: {
    fontSize: windowWidth * 0.045,
  },
});

export default Clave;
