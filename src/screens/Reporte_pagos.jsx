import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, RefreshControl, Alert, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';
import { BASE_URL } from '../services/url.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Reporte_Pagos = () => {
  const { token } = useContext(AuthContext);
  const [reportes, setReportes] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/reporte_pago.php`, {
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

  const calculateTotalPagos = (reportes) => {
    const consulta3 = reportes.consulta3 || [];
    const cantidadPagos = consulta3.length;
    const totalPagos = consulta3.reduce((acc, item) => acc + parseFloat(item.monto), 0);
    return { cantidadPagos, totalPagos };
  };

  const { cantidadPagos, totalPagos } = calculateTotalPagos(reportes);
  const consulta1 = reportes.consulta1 || {};
  const diasTranscurridos = consulta1.diasTranscurridos || 0;
  const diasTotales = consulta1.diasTotales || 0;
  const progresoDias = diasTranscurridos && diasTotales ? (diasTranscurridos / diasTotales) * 100 : 0;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>Reporte De Pagos Mensual</Text>
      
      <Text style={styles.subtitle}><Ionicons name="bar-chart" size={24} color="#4b5563" /> Gráfica</Text>
      {reportes.consulta2 && reportes.consulta2.map((item, index) => {
        const porcentaje = (parseFloat(item.monto) / 5000) * 100;
        return (
          <View key={index} style={styles.reportItem}>
            <Text style={styles.reportLabel}>{item.concepto}: {item.monto}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${porcentaje}%` }]} />
            </View>
          </View>
        );
      })}

      <Text style={styles.subtitle}><Ionicons name="stats-chart" size={24} color="#4b5563" /> Resumen</Text>
      <View style={styles.reportItem}>
        <Text style={styles.reportLabel}>Cantidad de Pagos:</Text>
        <Text style={styles.reportValue}>{cantidadPagos}</Text>
      </View>
      <View style={styles.reportItem}>
        <Text style={styles.reportLabel}>Total de Pagos:</Text>
        <Text style={styles.reportValue}>{totalPagos}</Text>
      </View>

      <Text style={styles.subtitle}><Ionicons name="time" size={24} color="#4b5563" /> Transcurso</Text>
      <View style={styles.reportItem}>
        <Text style={styles.reportLabel}>Días Transcurridos: {diasTranscurridos}</Text>
        <Text style={styles.reportLabel}>Días Totales: {diasTotales}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progresoDias}%` }]} />
        </View>
      </View>
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#4b5563',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
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
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
  },
});

export default Reporte_Pagos;
