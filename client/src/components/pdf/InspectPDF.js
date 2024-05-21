import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import dog from "../../images/dog.png";
import logo from "../../images/logo.jpg";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  textHeader: {
    fontSize: 12,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  text: {
    fontSize: 10,
  },
});

const ReportPdf = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={dog} />

        <Image style={styles.logo} src={logo} />
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Hermosillo, Sonora. A {data.date}.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Asunto: Reporte de inspección canina.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>TE CONNECTIVITY.--</Text>
        <Text style={styles.text}>Atención: {data.coordinator}.</Text>
        <Text style={styles.text}>Planta: {data.plant}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>HORA DESCRIPCIÓN</Text>
        <Text style={styles.text}>
          {data.start_time} HRS INICIO DEL RECORRIDO
        </Text>
        <Text style={styles.text}>15:02 HRS SE REGISTRA MARCAJE</Text>
        <Text style={styles.text}>{data.end_time} HRS FINALIZA INSPECCIÓN</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ÁREAS INSPECCIONADAS</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>INCIDENCIAS</Text>
          </View>
        </View>
        {/* {data.inspections.map((inspection, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{inspection.area}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{inspection.incident}</Text>
            </View>
          </View>
        ))} */}
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>DESCRIPCIÓN DE INCIDENCIA:</Text>
        <Text style={styles.text}>{data.incidentDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>RESULTADO: {data.result}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>RECOMENDACIONES: {data.recommendations}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>COMENTARIOS: {data.comments}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          BINOMIO: {data.name} / {data.k9}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>ATENTAMENTE</Text>
        <Text style={styles.text}>{data.name}</Text>
        <Text style={styles.text}>Director operativo SIIPCCSP</Text>
      </View>

      <View>
        <Text style={styles.textHeader}>
          SISTEMAS INTEGRALES EN INVESTIGACIÓN, PROTECCIÓN, CUSTODIA Y
          CONSULTORIA EN SEGURIDAD PRIVADA
        </Text>
        <Text style={styles.textHeader}>
          Damaris Ivonne Robles López RFC: ROLD7504062M6 Registro No.
          LSP-R-2014-F-369
        </Text>
        <Text style={styles.textHeader}>
          Email: siipccsp@hotmail.com Teléfono: 6621 803421
        </Text>
      </View>
    </Page>
  </Document>
);

export default ReportPdf;
