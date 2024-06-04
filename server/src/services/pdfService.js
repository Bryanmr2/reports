const PDFDocument = require("pdfkit");
const path = require("path");

function buildPDF(dataCallback, endCallback, reportData) {
  const doc = new PDFDocument({ bufferPages: true });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Adding header information
  doc.fontSize(10);
  doc.text("Hermosillo, Sonora. A 13 de septiembre del 2020.", 273, 65);
  doc.text("Asunto: Reporte de inspección canina.", 322, 80);

  // Add the dog image from the provided assets
  const dogImagePath = path.resolve(__dirname, "../assets/dog.png");
  doc.image(dogImagePath, 40, 20, { width: 80 });

  // Add the logo image to the top right
  const logoImagePath = path.resolve(__dirname, "../assets/logo.jpg");
  const logoWidth = 80;
  const pageWidth = doc.page.width;
  const logoX = pageWidth - logoWidth - 30;

  doc.image(logoImagePath, logoX, 30, { width: logoWidth });

  // Report details
  doc.fontSize(12).text(`${reportData.plant}`, 50, 160);
  doc.fontSize(12).text(`Atención: ${reportData.name}`, 50, 175);
  doc.fontSize(12).text(`Coordinador de seguridad patrimonial.`, 50, 190);
  doc.fontSize(12).text(`Planta: INDUSTRIAL`, 420, 170);

  // Table header
  doc.fontSize(10).text("HORA", 60, 220, { bold: true });
  doc.fontSize(10).text("DESCRIPCIÓN", 150, 220, { bold: true });

  // Set stroke color for the table
  doc.strokeColor("#8A8A8A");

  // Draw table header lines
  doc.moveTo(50, 215).lineTo(550, 215).stroke();
  doc.moveTo(50, 235).lineTo(550, 235).stroke();
  doc.moveTo(50, 215).lineTo(50, 235).stroke();
  doc.moveTo(140, 215).lineTo(140, 235).stroke();
  doc.moveTo(550, 215).lineTo(550, 235).stroke();

  // Table content
  doc.text(`14:00 HRS`, 55, 235);
  doc.text(`INICIO DEL RECORRIDO`, 150, 235);
  doc.text(`15:02 HRS`, 55, 250);
  doc.text(`SE REGISTRA MARCAJE`, 150, 250, { fillColor: "red" });
  doc.text(`15:15 HRS`, 55, 265);
  doc.text(`FINALIZA INSPECCIÓN`, 150, 265);

  // Draw table content lines
  doc.moveTo(50, 250).lineTo(550, 250).stroke();
  doc.moveTo(50, 265).lineTo(550, 265).stroke();
  doc.moveTo(50, 235).lineTo(50, 265).stroke();
  doc.moveTo(140, 235).lineTo(140, 265).stroke();
  doc.moveTo(550, 235).lineTo(550, 265).stroke();

  // Areas and incidents table header
  doc.fontSize(10).text("ÁREAS INSPECCIONADAS", 50, 295, { bold: true });
  doc.fontSize(10).text("INCIDENCIAS", 300, 295, { bold: true });

  // Draw header lines for areas and incidents
  doc.moveTo(50, 290).lineTo(550, 290).stroke();
  doc.moveTo(50, 310).lineTo(550, 310).stroke();
  doc.moveTo(50, 290).lineTo(50, 310).stroke();
  doc.moveTo(290, 290).lineTo(290, 310).stroke();
  doc.moveTo(550, 290).lineTo(550, 310).stroke();

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

  let y = 325;
  areas.forEach((area) => {
    doc.text(area, 50, y);
    doc.text("NINGUNA", 300, y);

    // Draw content lines
    doc
      .moveTo(50, y - 5)
      .lineTo(550, y - 5)
      .stroke();
    doc
      .moveTo(50, y - 5)
      .lineTo(50, y + 10)
      .stroke();
    doc
      .moveTo(290, y - 5)
      .lineTo(290, y + 10)
      .stroke();
    doc
      .moveTo(550, y - 5)
      .lineTo(550, y + 10)
      .stroke();

    y += 15;
  });

  // Footer information
  doc
    .fontSize(9)
    .text(
      "SISTEMAS EN INVESTIGACIÓN, PROTECCIÓN, CUSTODIA Y CONSULTORIA EN SEGURIDAD PRIVADA",
      50,
      687,
      { align: "center" }
    );
  doc.text(
    "Damaris Ivonne Robles López RFC: ROLD7504062M6 Registro No. LSP-R-2019-F-1249",
    50,
    697,
    { align: "center" }
  );
  doc.text("Correo: gmendoza@siipccp.com Teléfono: 6621 803421", 50, 707, {
    align: "center",
  });

  // Finalize the PDF
  doc.end();
}

module.exports = { buildPDF };
