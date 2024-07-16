import React, { useEffect, useState, useContext } from "react";
import { FlatList, Text, View, StyleSheet, RefreshControl, TextInput } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';

import RepositoryItem_inscripciones from '../components/RepositoryItem_inscripciones.jsx'
import {BASE_URL} from '../services/url.jsx'
import { AuthContext } from '../context/AuthContext.jsx';

const Inscripciones = () => {
  const { token } = useContext(AuthContext);
  const [inscripciones, setInscripciones] = useState([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/inscripciones.php`, {
        token: token
      });

      console.log(response.data);
      if (response.data.success) {
        setInscripciones(response.data.resultado);
        setFilteredInscriptions(response.data.resultado);
      } else {
        // Mostrar mensaje de error si no hay éxito
        Alert.alert('Error', response.data.msg || 'Error al obtener datos');
      }
    } catch (error) {
      console.error('Error: ', error.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  useEffect(() => {
    // Filtrar inscripciones basado en searchQuery
    if (searchQuery) {
      setFilteredInscriptions(inscripciones.filter(inscripcion =>
        inscripcion.cedula && inscripcion.cedula.toString().includes(searchQuery)
      ));
    } else {
      setFilteredInscriptions(inscripciones);
    }
  }, [searchQuery, inscripciones]);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1, paddingHorizontal: 10 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por Cédula"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredInscriptions}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={({ item: repo }) => (
          <RepositoryItem_inscripciones {...repo} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#36B5A6"]}
            tintColor={"#36B5A6"}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Inscripciones;

