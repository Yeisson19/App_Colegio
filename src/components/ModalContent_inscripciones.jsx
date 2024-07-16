import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";

const ModalContent_inscripciones = ({ visible, onClose, 	nombre, apellido, edad }) => {


  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <View style={styles.ModalContent_inscripciones}>
          <Text style={[styles.label, styles.textCenter]}>-----DATOS inscripciones-----</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.text}>{nombre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Apellido:</Text>
            <Text style={styles.text}>{apellido}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.text}>{edad}</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalContent_inscripciones: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
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
  textCenter: {
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default ModalContent_inscripciones;
