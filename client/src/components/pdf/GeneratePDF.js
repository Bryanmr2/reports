import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { Button } from "@mui/material";
import logo from "../../images/logo.jpg";
import dog from "../../images/dog.png";

const styles = {
  container: {
    padding: "10px",
  },
  iconsContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  headerText: {
    display: "flex",
    position: "relative",
    paddingLeft: "2.5cm",
    paddingRight: "4.5cm",
    width: "100%",
    marginTop: "1cm",
    marginBottom: "1cm",
  },
  plantWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  plantOne: {
    width: "50%",
  },
  plantTwo: {
    width: "50%",
    textAlign: "right",
  },
  icon: {
    width: "100px",
  },
  date: {
    textAlign: "right",
    marginBottom: "20px",
  },
  description: {
    marginTop: "20px",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    borderTop: "1px solid #000",
    padding: 10,
    fontSize: "10px",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
};

const PDFDocument = ({ data }) => (
  <Document>
    <Page size="LETTER" style={styles.container}>
      <View style={styles.iconsContainer}>
        <Image src={dog} style={styles.icon} />
        <Image src={logo} style={styles.icon} />
      </View>

      <View style={styles.headerText}>
        <View style={styles.date}>
          <Text>Fecha: {data.date}</Text>
          <Text>Asunto: {data.shipment_type}</Text>
        </View>
        <View style={styles.plantWrapper}>
          <View style={styles.plantOne}>
            <Text style={{ fontWeight: "bold" }}>{data.plant}.-</Text>
            <Text>Atención: {data.name}</Text>
            <Text>Can: {data.dog_name}</Text>
          </View>
          <View style={styles.plantTwo}>
            <Text>Planta: Por definir</Text>
            <Text>Turno: {data.shift}</Text>
          </View>
        </View>
      </View>

      {data.inspection_type === "inspeccion_canina" && (
        <View>
          <Text>Descripción de Incidencias: {data.inspection_description}</Text>
        </View>
      )}

      {["importacion", "exportacion"].includes(data.inspection_type) && (
        <View>
          <Text>Inspecciones de Embarque:</Text>
          {data.shipment_inspections.map((shipment, index) => (
            <View
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px solid #000",
                padding: "4px 0",
              }}
            >
              <View style={{ width: "50%", paddingRight: 8 }}>
                <Text>Tipo de Embarque: {shipment.shipment_type}</Text>
                <Text>Hora: {shipment.hour}</Text>
                <Text>Número de Tractor: {shipment.tractor_number}</Text>
                <Text>Placas: {shipment.plates}</Text>
                <Text>Compañía: {shipment.company}</Text>
                <Text>Conductor: {shipment.driver}</Text>
                <Text>Número de Caja: {shipment.box_number}</Text>
                <Text>Número de Sello: {shipment.seal_number}</Text>
              </View>
              <View style={{ width: "50%", paddingLeft: 8 }}>
                <Text>Incidencia: {shipment.incidence}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {data.inspection_areas.length > 0 && (
        <View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ÁREAS INSPECCIONADAS</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>INCIDENCIAS</Text>
              </View>
            </View>
            {data.inspection_areas.map((area, index) => (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{area.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{area.incidence}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
      <View style={styles.description}>
        <Text>Descripción de Incidencias: </Text>
        <Text>{data.inspection_description}</Text>
      </View>

      <View style={styles.footer}>
        <Text>
          SISTEMAS INTEGRALES DE INVESTIGACIÓN, PROTECCIÓN, CUSTODIA Y
          CONSULTURIA EN SEGURIDAD PRIVADA
        </Text>
        <Text>
          Damaris Ivonne Robles López RFC: ROLD7504062M6 Registro No.
          LSP-R-2019-F-1249
        </Text>
        <Text>Correo: gmendoza@siipccp.com Teléfono: 6621 803421</Text>
      </View>
    </Page>
  </Document>
);

const GeneratePDF = ({ data }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <PDFDownloadLink
      document={<PDFDocument data={data} />}
      fileName="reporte_inspeccion.pdf"
    >
      {({ loading }) =>
        loading ? (
          <Button style={{ marginTop: "6%" }} variant="contained">
            Generando PDF...
          </Button>
        ) : (
          <Button style={{ marginTop: "6%" }} variant="contained">
            Descargar PDF
          </Button>
        )
      }
    </PDFDownloadLink>
    <div style={{ height: "500px", marginTop: "20px" }}>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <PDFDocument data={data} />
      </PDFViewer>
    </div>
  </div>
);

export default GeneratePDF;
