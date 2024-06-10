import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity , RefreshControl } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
import RepositoryItem_horario from '../components/RepositoryItem_horario.jsx'
import {BASE_URL} from '../services/url.jsx'
import { useRoute } from '@react-navigation/native';


const ano_academico = ({ route }) => {
  // const route = useRoute();
  const  userData  = route.params;
  const [ano_academico, setano_academico] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userData]);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/ano_academico.php`, {
        dato: userData
      });

      setano_academico(response.data);
    } catch (error) {
      console.error('Error: ', error.message);
    } finally {
      setIsRefreshing(false);
    }
  };

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

export default ano_academico;