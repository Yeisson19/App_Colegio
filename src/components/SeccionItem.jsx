import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SeccionItem = ({ seccion, onPressSeccion}) => {
 
  return (
    <TouchableOpacity  onPress={() => onPressSeccion(seccion)}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.text}>{seccion.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sección:</Text>
          <Text style={styles.text}>{seccion.secciones}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Turno:</Text>
          <Text style={styles.text}>{seccion.turnos}</Text>
        </View>
        <Ionicons style={styles.icon} name="chevron-forward" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 18,
    paddingRight: 95,
    marginBottom: 7,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
  },
  icon:{
    paddingLeft:100
  }
});

export default SeccionItem;
