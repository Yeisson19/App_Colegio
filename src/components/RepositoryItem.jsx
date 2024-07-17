import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";

const RepositoryItem = (props) => {
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
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.text}>{props.id}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Materia:</Text>
            <Text style={styles.text}>{props.nombre}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.text}>{props.estado}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.label, styles.textCenter]}>-----Mas Detalles-----</Text>
          <View style={styles.row}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.text}>{props.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Materia:</Text>
            <Text style={styles.text}>{props.nombre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.text}>{props.estado}</Text>
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

export default RepositoryItem;

