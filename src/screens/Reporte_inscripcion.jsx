import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, RefreshControl, Alert, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';
import { BASE_URL } from '../services/url.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Reportes = () => {
  const { token } = useContext(AuthContext);
  const [reportes, setReportes] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/reporte_inscripcion.php`, {
        token: token
      });

      console.log(response.data.reportes);
      if (response.data.success) {
        setReportes(response.data.reportes || {});
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
      <Text style={styles.title}>Reportes de Inscripciones</Text>
      {Object.entries(reportes).map(([key, value]) => (
        <View key={key} style={styles.reportItem}>
          <Ionicons name="school" size={24} color="#10b981" />
          <View style={styles.reportContent}>
            <Text style={styles.reportLabel}>Estudiantes Inscritos {key} Año:</Text>
            <Text style={styles.reportValue}>{value}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1f2937',
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  reportContent: {
    marginLeft: 10,
  },
  reportLabel: {
    fontSize: 18,
    color: '#4b5563',
  },
  reportValue: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: 'bold',
  },
});

export default Reportes;
