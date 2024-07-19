import React, { useEffect, useState, useContext, useCallback } from "react";
import { FlatList, Text, View, StyleSheet, RefreshControl, TextInput, Alert } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import RepositoryItem_horario from '../components/RepositoryItem_horario';
import { BASE_URL } from '../services/url.jsx';
import { AuthContext } from '../context/AuthContext';

const Horarios = () => {
  const { token } = useContext(AuthContext);
  const [horarios, setHorarios] = useState([]);
  const [filteredHorarios, setFilteredHorarios] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/horario.php`, {
        token: token
      });

      console.log(response.data);
      if (response.data.success) {
        setHorarios(response.data.resultado);
        setFilteredHorarios(response.data.resultado);
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
      setFilteredHorarios(horarios.filter(horario =>
        (horario.id && horario.id.toString().includes(searchQuery)) ||
        (horario.clase && horario.clase.toString().includes(searchQuery)) ||
        (horario.cedula && horario.cedula.toString().includes(searchQuery))
      ));
    } else {
      setFilteredHorarios(horarios);
    }
  }, [searchQuery, horarios]);

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
        data={filteredHorarios}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={({ item: horario }) => (
          <RepositoryItem_horario {...horario} />
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

export default Horarios;

