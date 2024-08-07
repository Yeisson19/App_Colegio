import React, { useEffect, useState, useContext, useCallback } from "react";
import { FlatList, Text, View, StyleSheet, RefreshControl, TextInput } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import RepositoryItem_ano_academico from '../components/RepositoryItem_ano_academico';
import { BASE_URL } from '../services/url.jsx';
import { AuthContext } from '../context/AuthContext';

const Ano_academico = () => {
  const { token } = useContext(AuthContext);
  const [ano_academico, setAno_academico] = useState([]);
  const [filteredYears, setFilteredYears] = useState([ano_academico]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/ano_academico.php`, {
        token: token
      });

      console.log(response.data);
      if (response.data.success) {
        setAno_academico(response.data.resultado);
        setFilteredYears(response.data.resultado);
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
      setFilteredYears(ano_academico.filter(year => 
        (year.id && year.id.toString().includes(searchQuery)) ||
        (year.estatus && year.estatus.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (year.ano_academico && year.ano_academico.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
    } else {
      setFilteredYears(ano_academico);
    }
  }, [searchQuery, ano_academico]);

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
        data={filteredYears}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={({ item: year }) => (
          <RepositoryItem_ano_academico {...year} />
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

export default Ano_academico;
