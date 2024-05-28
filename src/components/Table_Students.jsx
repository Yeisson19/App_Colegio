import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import data from '../services/data';

const MyComponent = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 5, 6]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[2]
  );

  const [items] = React.useState(data);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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

        {items.slice(from, to).map((item) => (
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
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
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
    justifyContent: 'center', // Alineación vertical centrada
  },
  row: {
    maxWidth: 80,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    justifyContent: 'center', // Alineación vertical centrada
  },
});

export default MyComponent;
