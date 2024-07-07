import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const Screen1 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('./img/7.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={[styles.subtitle, { textAlign: 'justify' }]}>
          La Unidad Educativa Colegio Carlos Soublette es una institución
          privada ubicada en la carrera 18 entre las calles 49 y 50 de
          Barquisimeto, estado Lara, en el municipio Iribarren, parroquia
          Concepción. Es una institución educativa cuya principal misión es
          ayudar en el desarrollo educativo de los jóvenes adolescentes,
          brindando una educación de calidad en todas las diferentes áreas,
          tanto en el campo de las ciencias como en los ámbitos sociales.
        </Text>
        <Text style={[styles.subtitle, { textAlign: 'justify' }]}>
          Además, la institución a lo largo del año presenta a los estudiantes
          diversas actividades relacionadas con las distintas festividades y
          celebraciones a lo largo del año, así como diferentes proyectos
          enfocados en labores sociales que permiten a la institución y a sus
          estudiantes unirse aún más a la comunidad. Como unidad educativa, se
          centra en los niveles académicos de 1ro a 5to año de bachillerato, y
          al culminar sus estudios en la institución, el estudiante se graduará
          con el título de bachiller en ciencias.
        </Text>
        <Button
          title="MAS..."
          onPress={() => navigation.navigate('Screen2')}
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // o 'contain'
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 8,
  },
});

export default Screen1;