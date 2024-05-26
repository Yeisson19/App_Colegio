import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity , RefreshControl } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
import RepositoryItem_pagos from '../components/RepositoryItem_pagos'
import {BASE_URL} from '../services/url.jsx'
import { useRoute } from '@react-navigation/native';

const Pagos = ({ route }) => {
  // const route = useRoute();
  const  userData  = route.params;
  const [pagos, setPagos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userData]);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/Pagos.php`, {
        dato: userData
      });
      setPagos(response.data);
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
        data={pagos}
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


export default Pagos;
