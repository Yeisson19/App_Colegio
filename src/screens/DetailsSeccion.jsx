import React from 'react';
import { View, Text, StyleSheet ,ScrollView} from 'react-native';
import Tabla_Students from '../components/Table_Students';

const DetailsScreen = ({ route }) => {
  const { seccion } = route.params;
  

  return (
  <ScrollView>
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

      <Tabla_Students seccion_id={seccion.id}/>
    </View>
  </ScrollView>
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
