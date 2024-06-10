import React, { useEffect, useState, useContext } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity , RefreshControl } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'

import RepositoryItem_ano_academico from '../components/RepositoryItem_ano_academico'
import {BASE_URL} from '../services/url.jsx'
import { AuthContext } from '../context/AuthContext';



const Ano_academico = () => {
  const { token } = useContext(AuthContext);
  const [ano_academico, setAno_academico] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);


  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/ano_academico.php`, {
        token: token
      });

      console.log(response.data);
      if (response.data.success) {
        setAno_academico(response.data.resultado);
      } else {
        // console.log(response.data.msg);
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

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
    
      <FlatList
        data={ano_academico}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={({ item: repo }) => (
          <RepositoryItem_ano_academico {...repo} />
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


export default Ano_academico;
