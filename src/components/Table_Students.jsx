import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../services/url.jsx';

const Tabla_Students = ({ seccion_id }) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15, 25]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[1]);
  const [students, setStudents] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { token } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.post(`${BASE_URL}/api/mobile/seccion.php`, {
        token: token, 
        request: "estudiantes",
        id: seccion_id
      });

      // console.log("response.data: ", response.data);
      if (response.data.success && Array.isArray(response.data.resultado)) {
        setStudents(response.data.resultado);
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

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, students.length);

  return (
    <ScrollView horizontal>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.Column}><Text>Cédula</Text></DataTable.Title>
          <DataTable.Title style={styles.Column}><Text>Nombre</Text></DataTable.Title>
          <DataTable.Title style={styles.Column}><Text>Apellido</Text></DataTable.Title>
          <DataTable.Title style={styles.Column}><Text>Edad</Text></DataTable.Title>
          <DataTable.Title style={styles.Column}><Text>Observaciones</Text></DataTable.Title>
        </DataTable.Header>

        {students.slice(from, to).map((item) => (
          <DataTable.Row key={item.cedula}>
            <DataTable.Cell style={styles.row}><Text>{item.cedula}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.row}><Text>{item.nombre}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.row}><Text>{item.apellido}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.row}><Text>{item.edad}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.row}><Text>{item.observaciones}</Text></DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(students.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${students.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Column: {
    maxWidth: 80,
    justifyContent: 'center',
  },
  row: {
    maxWidth: 80,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});

export default Tabla_Students;
