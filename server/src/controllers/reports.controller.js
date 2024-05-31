const { createReportInDB } = require("../services/reportService");
const pdfService = require("../services/pdfService");

const createInspection = async (req, res) => {
  try {
    const {
      location,
      date,
      name,
      dog_name,
      corporate,
      plant,
      shift,
      inspection_area,
    } = req.body;

    // const results = await createReportInDB(req.body);
    // if (results) {
    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment;filename=invoice.pdf`,
    });
    pdfService.buildPDF(
      (chunk) => stream.write(chunk),
      () => stream.end(),
      req.body
    );
    // }

    console.log("Reporte enviado");
  } catch (err) {
    console.error("Error durante la creación del reporte:", err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  createInspection,
};
