import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, RefreshControl, Alert, ScrollView } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';
import { BASE_URL } from '../services/url.jsx';
import { AuthContext } from '../context/AuthContext';

const Reportes = () => {
  const { token } = useContext(AuthContext);
  const [reportes, setReportes] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/reporte.php`, {
        token: token
      });

      console.log(response.data.resultado);
      if (response.data.success) {
        setReportes(response.data.resultado);
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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>Reportes</Text>
      {Object.entries(reportes).map(([key, value]) => (
        <View key={key} style={styles.reportItem}>
          <Text style={styles.reportLabel}>{key}:</Text>
          <Text style={styles.reportValue}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  reportLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportValue: {
    fontSize: 18,
    color: '#333',
  },
});

export default Reportes;
