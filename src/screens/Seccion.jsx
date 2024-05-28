import React, { useState, useEffect } from 'react';
import { View,ScrollView} from 'react-native';
import List_Year from '../components/List_Year'; 
import seccionesData from '../services/seccion.json'; // Importar el archivo JSON directamente




const Seccion = ({ navigation }) => {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    try {
      // console.log('Datos cargados:', seccionesData); // Agregar log para verificar datos
      setSecciones(seccionesData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

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
