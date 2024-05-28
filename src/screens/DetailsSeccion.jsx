import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { seccion } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Sección</Text>
      <Text style={styles.label}>ID: {seccion.id}</Text>
      <Text style={styles.label}>Sección: {seccion.secciones}</Text>
      <Text style={styles.label}>Cantidad: {seccion.cantidad}</Text>
      <Text style={styles.label}>Año: {seccion.año}</Text>
      <Text style={styles.label}>Turno: {seccion.turnos}</Text>
      <Text style={styles.label}>Docente Guía: {seccion.docente_guia}</Text>
      <Text style={styles.label}>Año Académico: {seccion.ano_academico}</Text>
      <Text style={styles.label}>Cantidad de Estudiantes: {seccion.cantidad_estudiantes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetailsScreen;
