const PDFDocument = require("pdfkit");
const path = require("path");

function buildPDF(dataCallback, endCallback, reportData) {
  const doc = new PDFDocument({ bufferPages: true });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Adding header information
  doc.fontSize(10);
  doc.text("Hermosillo, Sonora. A 13 de septiembre del 2020.", 450, 50);
  doc.text("Asunto: Reporte de inspección canina.", 450, 65);
  doc.text("Planta: INDUSTRIAL", 450, 80);

  // Add the dog image from the provided assets
  const imagePath = path.resolve(__dirname, "../assets/dog.png");
  doc.image(imagePath, 50, 50, { width: 100 });

  // Report details
  doc.fontSize(12).text(`${reportData.plant}`, 50, 160);
  doc.fontSize(12).text(`Atención: ${reportData.name}`, 50, 175);
  doc.fontSize(12).text(`Coordinador de seguridad patrimonial.`, 50, 190);

  // Table header
  doc.fontSize(10).text("HORA", 50, 220, { bold: true });
  doc.fontSize(10).text("DESCRIPCIÓN", 150, 220, { bold: true });

  // Table content
  doc.text(`14:00 HRS`, 50, 235);
  doc.text(`INICIO DEL RECORRIDO`, 150, 235);
  doc.text(`15:02 HRS`, 50, 250);
  doc.text(`SE REGISTRA MARCAJE`, 150, 250, { fillColor: "red" });
  doc.text(`15:15 HRS`, 50, 265);
  doc.text(`FINALIZA INSPECCIÓN`, 150, 265);

  // Areas and incidents table header
  doc.fontSize(10).text("ÁREAS INSPECCIONADAS", 50, 295, { bold: true });
  doc.fontSize(10).text("INCIDENCIAS", 300, 295, { bold: true });

  // Areas and incidents table content
  const areas = [
    "ACCESOS",
    "LOCKERS",
    "PUERTA 4 Y 5",
    "CABLES",
    "REMACHADO",
    "BAÑOS",
    "CONTACTORES",
    "CQ",
    "TOOL CRIB",
    "PRUEBAS ELÉCTRICAS",
    "CUARTO DE MOLIDO",
    "KANBAN",
    "RACKS DE PRODUCCIÓN",
    "ÁREA DE 3P",
    "REPRO",
    "MACHINE SHOP",
    "BAÑOS GENERALES",
    "SCRAP",
    "PASILLOS DE PRODUCCIÓN",
    "ESTACIONAMIENTO",
  ];

  let y = 310;
  areas.forEach((area) => {
    doc.text(area, 50, y);
    doc.text("NINGUNA", 300, y);
    y += 15;
  });

  // Finalize the PDF
  doc.end();
}

module.exports = { buildPDF };
