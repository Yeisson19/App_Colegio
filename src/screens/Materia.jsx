import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity , RefreshControl } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
import RepositoryItem from '../components/RepositoryItem'
import {BASE_URL} from '../services/url.jsx'

const Materia = ({ userData, onLogout }) => {
  const [materias, setMaterias] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userData]);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/carlossoublette/api/mobile/materia.php`, {
        dato: userData
      });
      setMaterias(response.data);
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Ionicons name="power" size={14} color="white" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>MATERIAS</Text>
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

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    color: 'white',
    backgroundColor: '#36B5A6',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    paddingRight: 3,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 12,
  },
});

export default Materia;
