import * as React from 'react';
import { List } from 'react-native-paper';
import SeccionItem from './SeccionItem';
 
const List_Year = ({ secciones, onPressSeccion }) => {
 
  // Filtrar secciones por año
  const seccionesPorAno = (ano) => {
    return secciones.filter(seccion => seccion.año === ano.toString());
  };

  const renderSecciones = (ano) => {
    const filteredSecciones = seccionesPorAno(ano);
    return filteredSecciones.map((seccion) => (
      <SeccionItem key={seccion.id} seccion={seccion} onPressSeccion={onPressSeccion} />
    ));
  };
 
  return (
    <List.Section title="Año Académico 2023-2024">
      <List.Accordion
        title="1er Año"
        left={props => <List.Icon {...props} icon="equal" />}>
        {renderSecciones(1)}
      </List.Accordion>

      <List.Accordion
        title="2do Año"
        left={props => <List.Icon {...props} icon="equal" />}>
        {renderSecciones(2)}
      </List.Accordion>

      <List.Accordion
        title="3er Año"
        left={props => <List.Icon {...props} icon="equal" />}>
        {renderSecciones(3)}
      </List.Accordion>

      <List.Accordion
        title="4to Año"
        left={props => <List.Icon {...props} icon="equal" />}>
        {renderSecciones(4)}
      </List.Accordion>

      <List.Accordion
        title="5to Año"
        left={props => <List.Icon {...props} icon="equal" />}>
        {renderSecciones(5)}
      </List.Accordion>
    </List.Section>
  );
};

export default List_Year;
