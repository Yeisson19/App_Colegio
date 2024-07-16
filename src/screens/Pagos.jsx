import React, { useEffect, useState, useContext } from "react";
import { FlatList, Text, View, StyleSheet, RefreshControl, TextInput } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';

import RepositoryItem_pagos from '../components/RepositoryItem_pagos';
import { BASE_URL } from '../services/url.jsx';
import { AuthContext } from '../context/AuthContext';

const Pagos = () => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/pagos.php`, {
        token: token
      });

      console.log(response.data);
      if (response.data.success) {
        setPagos(response.data.resultado);
        setFilteredPayments(response.data.resultado);
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
      setFilteredPayments(pagos.filter(payment => 
        payment.id_deudas.toString().includes(searchQuery)
      ));
    } else {
      setFilteredPayments(pagos);
    }
  }, [searchQuery, pagos]);

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
        data={filteredPayments}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={({ item: repo }) => (
          <RepositoryItem_pagos {...repo} />
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

export default Pagos;
