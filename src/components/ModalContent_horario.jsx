import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal} from "react-native";


const ModalContent_horario = ({ visible, onClose, id, clase, dia, profesor, ini, fin}) => {
  

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <View style={styles.modalContent}>
          <Text style={[styles.label, styles.textCenter]}>-----DATOS-----</Text>
          <View style={styles.row}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.text}>{id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>clase:</Text>
            <Text style={styles.text}>{clase}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>dia:</Text>
            <Text style={styles.text}>{dia}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>profesor:</Text>
            <Text style={styles.text}>{profesor}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>inicio:</Text>
            <Text style={styles.text}>{ini}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>fin:</Text>
            <Text style={styles.text}>{fin}</Text>
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
  modalContent: {
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

export default ModalContent_horario;
