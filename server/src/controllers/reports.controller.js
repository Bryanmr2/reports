const { createReportInDB } = require("../services/reportService");

const createReport = async (req, res) => {
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

    if (
      !location ||
      !date ||
      !name ||
      !dog_name ||
      !corporate ||
      !plant ||
      !shift ||
      !inspection_area
    ) {
      return res.status(400).json({ message: "Faltan datos del informe" });
    }

    const results = await createReportInDB(req.body);
    res.send(results);
    console.log("reporte enviado");
  } catch (err) {
    console.error("Error durante la creación del informe:", err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  createReport,
};
