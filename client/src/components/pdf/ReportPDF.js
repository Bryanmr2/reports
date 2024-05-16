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
        <Text>Location: {data.location}</Text>
        <Text>Date: {data.date}</Text>
        <Text>Name: {data.name}</Text>
        <Text>Dog Name: {data.dog_name}</Text>
        <Text>Corporate: {data.corporate}</Text>
        <Text>Plant: {data.plant}</Text>
        <Text>Shift: {data.shift}</Text>
        <Text>Inspection Area: {data.inspection_area}</Text>
        <Text>Inspection Description: {data.inspection_description}</Text>
        <Text>Shipment Type: {data.shipment_type}</Text>
        <Text>Start Time: {data.start_time}</Text>
        <Text>Inspected Areas: {data.inspected_areas}</Text>
        <Text>End Time: {data.end_time}</Text>
        <Text>Security Items: {data.security_items}</Text>
      </View>
    </Page>
  </Document>
);

export default ReportPdf;
