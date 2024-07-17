import React, { useEffect, useState, useContext, useCallback} from "react";
import { FlatList, Text, View, StyleSheet, RefreshControl, TextInput, Alert } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import RepositoryItem from '../components/RepositoryItem';
import { BASE_URL } from '../services/url.jsx';
import { AuthContext } from '../context/AuthContext';

const Materias = () => {
  const { token } = useContext(AuthContext);
  const [materias, setMaterias] = useState([]);
  const [filteredMaterias, setFilteredMaterias] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/materia.php`, {
        token: token
      });

      console.log(response.data);
      if (response.data.success) {
        setMaterias(response.data.resultado);
        setFilteredMaterias(response.data.resultado);
      } else {
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
    if (searchQuery) {
      setFilteredMaterias(materias.filter(materia => 
        materia.id.toString().includes(searchQuery)
      ));
    } else {
      setFilteredMaterias(materias);
    }
  }, [searchQuery, materias]);

  useFocusEffect(
    useCallback(() => {
      // Limpia el campo de búsqueda cuando la pantalla gana el foco
      setSearchQuery('');
    }, [])
  );

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1, paddingHorizontal: 10 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por ID"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredMaterias}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={({ item: repo }) => (
          <RepositoryItem {...repo} />
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

export default Materias;
