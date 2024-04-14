import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";

const ModalContent = ({ visible, onClose, id, materia, años, docenteNombreApellido }) => {
  const docentes = docenteNombreApellido.split(',');

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
            <Text style={styles.label}>Materia:</Text>
            <Text style={styles.text}>{materia}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Años:</Text>
            <Text style={styles.text}>{años}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Docentes:</Text>
            <FlatList
              data={docentes}
              renderItem={({ item }) => (
                <Text style={styles.text}>{item.trim()}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
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

export default ModalContent;
