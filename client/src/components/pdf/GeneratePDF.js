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
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  date: {
    textAlign: "right",
  },
  plant: {
    display: "flex",
    justifyContent: "space-between",
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
};

const PDFDocument = ({ data }) => (
  <Document>
    <Page style={styles.container}>
      <View style={styles.icons}>
        <Image src={dog} style={{ height: 120, marginLeft: 10 }} />
        <Image src={logo} style={{ height: 80, marginRight: 10 }} />
      </View>

      <View style={styles.date}>
        <Text>Fecha: {data.date}</Text>
        <Text>Asunto: {data.shipment_type}</Text>
      </View>

      <View style={styles.plant}>
        <Text>Atención: {data.name}</Text>
        <Text>{data.plant}</Text>
        <Text>Nombre del Can: {data.dog_name}</Text>
        <Text>Turno: {data.shift}</Text>
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
          <Text style={{ marginTop: "15px" }}>Áreas de Inspección:</Text>
          {data.inspection_areas.map((area, index) => (
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
                <Text>Nombre del Área: {area.name}</Text>
              </View>
              <View style={{ width: "50%", paddingLeft: 8 }}>
                <Text>Incidencia: {area.incidence}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
      <View style={styles.description}>
        <Text>Descripción de Incidencias: {data.inspection_description}</Text>
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
