import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import ModalContent_inscripciones from "./ModalContent_inscripciones";

const RepositoryItem_inscripciones = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View key={props.id_deudas} style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.text}>{props.nombre}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ref:</Text>
          <Text style={styles.text}>{props.apellido}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Monto:</Text>
          <Text style={styles.text}>{props.edad}</Text>
        </View>
      </View>
      <ModalContent_inscripciones
        visible={modalVisible}
        onClose={handleCloseModal}
        id_deudas={props.nombre}
        identificador={props.apellido}
        monto={props.edad}   
         
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 13,
    paddingRight: 95,
    marginBottom: 1,
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
});

export default RepositoryItem_inscripciones;
