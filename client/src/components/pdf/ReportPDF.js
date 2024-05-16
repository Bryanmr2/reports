import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
});

const ReportPdf = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Ubicación: {data.location}</Text>
        <Text>Fecha: {data.date}</Text>
        <Text>Nombre: {data.name}</Text>
        <Text>Nombre del Perro: {data.dog_name}</Text>
        <Text>Empresa: {data.corporate}</Text>
        <Text>Planta: {data.plant}</Text>
        <Text>Turno: {data.shift}</Text>
        <Text>Áreas Inspeccionadas: {data.inspection_area}</Text>
        <Text>Descripción de la Inspección: {data.inspection_description}</Text>
        <Text>Tipo de Embarque: {data.shipment_type}</Text>
        <Text>Empresa Transportista: {data.carrier_company}</Text>
        <Text>Nombre del Operador: {data.operator_name}</Text>
        <Text>Marca del Tractor: {data.tractor_brand}</Text>
        <Text>Color del Tractor: {data.tractor_color}</Text>
        <Text>Modelo del Tractor: {data.tractor_model}</Text>
        <Text>Placa del Tractor: {data.tractor_plate}</Text>
        <Text>Número del Tractor: {data.tractor_number}</Text>
        <Text>Número del Remolque: {data.trailer_number}</Text>
        <Text>Número de Embarque: {data.shipment_number}</Text>
        <Text>Total de Pallets: {data.total_skids}</Text>
        <Text>Número de Sellos: {data.stamps_number}</Text>
        <Text>Empresa de Seguridad: {data.security_company}</Text>
        <Text>Nombres de los Guardias: {data.guard_names}</Text>
        <Text>Empresa de Custodia: {data.custody_company}</Text>
        <Text>Nombres de los Custodios: {data.custodian_names}</Text>
        <Text>Número de Unidad de Custodia: {data.custody_unit_number}</Text>
        <Text>Hora de Salida: {data.departure_time}</Text>
      </View>
    </Page>
  </Document>
);

export default ReportPdf;
