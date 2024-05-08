import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import ModalContent from "./ModalContent";

const RepositoryItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View key={props.id_materias} style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.text}>{props.id_materias}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Materia:</Text>
          <Text style={styles.text}>{props.materias}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Años:</Text>
          <Text style={styles.text}>{props.Años}</Text>
        </View>
      </View>
      <ModalContent
        visible={modalVisible}
        onClose={handleCloseModal}
        id={props.id_materias}
        materia={props.materias}
        años={props.Años}
        docenteNombreApellido={props.docente_nombre_apellido}
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

export default RepositoryItem;
