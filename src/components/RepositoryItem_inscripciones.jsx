import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";

const RepositoryItem_inscripciones = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handlePress = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <Text style={styles.touchableText}>Datos del Registro:</Text>
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Cedula:</Text>
            <Text style={styles.text}>{props.cedula}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.text}>{props.nombre}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.label, styles.textCenter]}>-----Más Detalles-----</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Cedula:</Text>
            <Text style={styles.text}>{props.cedula}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.text}>{props.nombre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Apellido:</Text>
            <Text style={styles.text}>{props.apellido}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.text}>{props.edad}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Observaciones:</Text>
            <Text style={styles.text}>{props.observaciones}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Materias Pendientes:</Text>
            <Text style={styles.text}>{props.materias_pendientes}</Text>
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#BDF3D4',
    marginBottom: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  touchable: {
    padding: 10,
  },
  touchableText: {
    fontWeight: 'normal',
    marginLeft: 8,
    marginBottom: 8,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  text: {
    fontSize: 16,
  },
  textCenter: {
    textAlign: 'center',
    width: '100%',
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#EAF7F1',
  },
});

export default RepositoryItem_inscripciones;

