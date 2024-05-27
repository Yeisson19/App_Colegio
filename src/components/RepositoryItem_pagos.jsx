import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import ModalContent_pagos from "./ModalContent_pagos";

const RepositoryItem_pagos = (props) => {
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
          <Text style={styles.text}>{props.id_deudas}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ref:</Text>
          <Text style={styles.text}>{props.identificador}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Monto:</Text>
          <Text style={styles.text}>{props.monto}</Text>
        </View>
      </View>
      <ModalContent_pagos
        visible={modalVisible}
        onClose={handleCloseModal}
        id_deudas={props.id_deudas}
        identificador={props.identificador}
        monto={props.monto}   
         
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

export default RepositoryItem_pagos;
