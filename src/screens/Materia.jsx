import React, { useEffect, useState,useContext } from "react";
import { FlatList, Text, View,  RefreshControl,Alert } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'
import RepositoryItem from '../components/RepositoryItem.jsx'
import {BASE_URL} from '../services/url.jsx'
import { AuthContext } from '../context/AuthContext';

const Materia = () => {
  const { token } = useContext(AuthContext);
  const [materias, setMaterias] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
// console.log(token);
  
  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/materia.php`, {
        token: token // Usa el token del contexto
      });
     
      console.log(response.data);
      if (response.data.success) {
        setMaterias(response.data.resultado);
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
        data={materias}
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

export default Materia;
