import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import ModalContent_ano_academico from "./ModalContent_ano_academico";

const RepositoryItem_ano_academico = (props) => {
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
        <Text style={styles.label}>inicio:</Text>
        <Text style={styles.text}>{props.fecha_ini}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>fin:</Text>
        <Text style={styles.text}>{props.fecha_cierr}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>ano:</Text>
        <Text style={styles.text}>{props.ano_academico}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>estado:</Text>
        <Text style={styles.text}>{props.estatus}</Text>
      </View>
      
    </View>
    <ModalContent_ano_academico
      visible={modalVisible}
      onClose={handleCloseModal}
      id={props.id}
      inicio={props.fecha_ini}
      fin={props.fecha_cierr}
      ano={props.ano_academico}
      estado={props.estatus}
      
    />
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
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

export default RepositoryItem_ano_academico;