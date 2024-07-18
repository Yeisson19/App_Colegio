import React, { useEffect, useState, useContext } from "react";
import { Text, View,Image, StyleSheet, RefreshControl, Alert, ScrollView } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';
// import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { BASE_URL } from '../services/url.jsx';
import { AuthContext } from '../context/AuthContext';

const Reportes = () => {
  const { token } = useContext(AuthContext);
  const [reportes, setReportes] = useState([
    { label: 'Repo1', value: 50 },
    { label: 'Repo2', value: 40 },
    { label: 'Repo3', value: 30 },
    { label: 'Repo4', value: 70 },
    { label: 'Repo5', value: 20 },
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/reporte.php`, {
        token: token
      });

      console.log(response.data.resultado);
      if (response.data.success) {
        // Actualiza los datos de reportes si es necesario
        // setReportes(response.data.resultado);
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

  const handleRefresh = () => {
    fetchData();
  };

  return (
      <View>
        <Text>Repo</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Reportes;
