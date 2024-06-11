import React, { useEffect, useState,useContext } from "react";
import { View,ScrollView, Alert} from "react-native";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {BASE_URL} from '../services/url.jsx'

import List_Year from '../components/List_Year';
 

const Seccion = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  const [secciones, setSecciones] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  
  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/seccion.php`, {
        token: token, // Usa el token del contexto
        request: "secciones"
      }); 
     
      console.log(response.data);
      if (response.data.success) {
        setSecciones(response.data.resultado);
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
  

 //Navegacion a sub-screen Details
  const handlePress = (seccion) => {
    navigation.navigate('Details', { seccion });
  };

  return (
  <View>
    <ScrollView>
       <List_Year secciones={secciones} onPressSeccion={handlePress} />
   </ScrollView>
  </View>
  );
};

export default Seccion;
