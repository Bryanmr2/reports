import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Button } from "@mui/material";
import logo from "../../images/logo.jpg";
import dog from "../../images/dog.png";

const getInspectionTypeLabel = (type) => {
  switch (type) {
    case "site":
      return "Inspección de Sitio";
    case "shipment":
      return "Inspección de Embarque";
    default:
      return type;
  }
};

const formatDate = (dateString) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month} del ${year}`;
};
const renderShipmentDetails = (shipment) => {
  const details = [
    ["Hora de Inicio", shipment.start_time],
    ["Tipo de Embarque", shipment.shipment_type],
    ["Número de Tractor", shipment.tractor_number],
    ["Placas", shipment.plates],
    ["Compañía", shipment.company],
    ["Conductor", shipment.driver],
    ["Número de Caja", shipment.box_number],
    ["Número de Sello", shipment.seal_number],
    ["Número de Guía", shipment.guide_number],
    ["Tarimas/Pallets", shipment.pallet_count],
    ["Bultos/Cajas", shipment.box_count],
    ["Hora de Finalización", shipment.end_time],
  ].filter(([, value]) => value);

  return (
    <View>
      {details.map(([label, value], i) => (
        <Text key={i}>
          {label}: {value}
        </Text>
      ))}
    </View>
  );
};
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v1/Helveticabold.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/helvetica/v1/Helvetica.ttf",
      fontWeight: "normal",
    },
  ],
});

const Br = () => "\n";

const styles = {
  container: {
    padding: "10px",
    paddingBottom: "80px",
  },
  iconsContainer: {
    paddingLeft: "35px",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 15,
    width: "100%",
  },
  headerText: {
    display: "flex",
    position: "relative",
    paddingLeft: "3.7cm",
    paddingRight: "4.5cm",
    width: "100%",
    marginTop: "1.5cm",
    marginBottom: "1cm",
    fontSize: "14",
  },
  plantWrapper: {
    paddingTop: "0.3cm",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  plantOne: {
    width: "50%",
    fontSize: "12",
  },
  plantTwo: {
    width: "50%",
    textAlign: "right",
    fontSize: "12",
  },
  plantBold: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: "14",
  },
  icon: {
    width: "100px",
  },
  date: {
    textAlign: "right",
    marginBottom: "20px",
    fontSize: "12",
  },
  tableContainer: {
    padding: "0px 50px 0px 50px",
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
  description: {
    padding: "20px 50px 0px 50px",
    fontSize: "14",
  },
  textDescription: {
    marginTop: "3px",
    padding: "3px 5px",
    borderTop: "1px solid black",
    backgroundColor: "#DFDDDD",
    fontSize: "14",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    borderTop: "1px solid black",
    padding: "10px 20px 10px 20px",
    fontSize: "10",
    lineHeight: "0.45mm",
  },
  footerTextOne: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12",
  },
  footerTextTwo: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12",
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
          <Text>Hermosillo, Sonora. A {data.date}.</Text>
          <Text>Asunto: {data.inspection_type}</Text>
        </View>
        <View style={styles.plantWrapper}>
          <View style={styles.plantOne}>
            <Text style={styles.plantBold}>{data.plant}.-</Text>
            <Text>Atención: {data.contact_person || "No especificado"}</Text>
            <Text>K9: {data.dog_name}</Text>
          </View>
          <View style={styles.plantTwo}>
            <Text>Turno: {data.shift}</Text>
            <Text>Manejador: {data.name} </Text>
          </View>
        </View>
      </View>

      {data.inspection_type === "Inspección de Sitio" && (
        <View style={styles.tableContainer}>
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
              <View style={styles.tableRow} key={index}>
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

      {data.inspection_type === "Inspección de Embarque" && (
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ÁREAS INSPECCIONADAS</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>INCIDENCIAS</Text>
              </View>
            </View>
            {data.shipment_inspections.map((shipment, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <View style={styles.tableCell}>
                    {renderShipmentDetails(shipment)}
                  </View>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{shipment.incidence}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.description}>
        <Text>Descripción de Incidencias: </Text>
        <View style={styles.textDescription}>
          <Text>{data.inspection_description}</Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Text>
          SISTEMAS INTEGRALES DE INVESTIGACIÓN, PROTECCIÓN, CUSTODIA Y
          CONSULTURIA EN SEGURIDAD PRIVADA
        </Text>
        <View style={styles.footerTextTwo}>
          <Text>
            Email: gmendoza@siipccp.com{" "}
            {
              "                                                                             "
            }
            Teléfono: 6621 803421
          </Text>
        </View>
        <View style={styles.footerTextOne}>
          <Text>
            Damaris Ivonne Robles López {"            "}
            RFC: ROLD7504062M6 {"           "}
            Registro No. LSP-R-2019-F-1249
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

const GeneratePDF = ({ data }) => {
  const transformedData = {
    ...data,
    inspection_type: getInspectionTypeLabel(data.inspection_type),
    date: formatDate(data.date),
  };

  console.log("pdf data:", transformedData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <PDFDownloadLink
        document={<PDFDocument data={transformedData} />}
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
      <div
        style={{
          height: "127vh",
          width: "50vw",
          maxWidth: "100%",
          marginTop: "50px",
          overflowX: "hidden",
          ...(window.innerWidth <= 1024 && {
            height: "41vh",
            width: "73vw",
          }),
        }}
      >
        <PDFViewer
          style={{ width: "100%", height: "100%", overflowX: "hidden" }}
        >
          <PDFDocument data={transformedData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default GeneratePDF;
