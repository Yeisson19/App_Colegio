import React, { useState, useRef } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { Button, Card } from 'react-native-paper';
import { BASE_URL } from '../../services/url';
import { Encriptar } from '../../auth/authentication.jsx';

const Codigo = ({ navigation, route }) => {
  const { user } = route.params;
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleInputChange = (value, index) => {
    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !codigo[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleConfirmar = async () => {
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length < 6) {
      Alert.alert('Error', 'Por favor introduce el código completo.');
      return;
    }
    const encryptedUsername = Encriptar(user); 
    const encryptedCode = Encriptar(codigoCompleto); 

    try {
      const response = await axios.post(`${BASE_URL}/api/mobile/class/confirmar.php`, {
        Usuario: encryptedUsername,
        Codigo: encryptedCode,
      });
      console.log(response.data);

      if (response.data.success) {
        console.log(response.data.msg);
        navigation.navigate('Clave', { user, codigo: codigoCompleto });
      } else {
        Alert.alert('Error', response.data.msg);
      }
    } catch (error) {
      console.error('Error de confirmación:', error.message);
      Alert.alert('Error', 'Ocurrió un error al confirmar el código.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Ingresa el Código</Text>
        <Text style={styles.subtitle}>Introduce el código de 6 dígitos enviado a tu correo.</Text>
        <Card style={styles.card}>
          <View style={styles.codeInputContainer}>
            {codigo.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleInputChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectionColor="#06BE99"
                underlineColorAndroid="transparent"
              />
            ))}
          </View>
          <Button 
            mode="contained" 
            onPress={handleConfirmar}
            style={styles.confirmButton}
            contentStyle={styles.confirmButtonContent}
            labelStyle={styles.confirmButtonText}
          >
            Confirmar
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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight * 0.03,
  },
  codeInput: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: windowWidth * 0.06,
    textAlign: 'center',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#06BE99',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 20,
    marginTop: windowHeight * 0.02,
  },
  confirmButtonContent: {
    height: windowHeight * 0.06,
  },
  confirmButtonText: {
    fontSize: windowWidth * 0.045,
  },
});

export default Codigo;
