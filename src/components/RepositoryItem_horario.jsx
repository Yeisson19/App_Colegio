import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import ModalContent_horario from "./ModalContent_horario";

const RepositoryItem_horario = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
    <View key={props.id} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.text}>{props.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>clase:</Text>
        <Text style={styles.text}>{props.clase}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>dia:</Text>
        <Text style={styles.text}>{props.dia2}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>profesor:</Text>
        <Text style={styles.text}>{props.cedula}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>inicio:</Text>
        <Text style={styles.text}>{props.clase_inicia}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>fin:</Text>
        <Text style={styles.text}>{props.clase}</Text>
      </View>
      
    </View>
    <ModalContent_horario
      visible={modalVisible}
      onClose={handleCloseModal}
      id={props.id}
      clase={props.clase}
      dia={props.dia2}
      profesor={props.cedula}
      ini={props.clase_inicia}
      fin={props.clase_termina}
      
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

export default RepositoryItem_horario;
