const {
  createReportInDB,
  createInspectReportInDB,
} = require("../services/reportService");

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
      return res.status(400).json({ message: "Faltan datos del reporte" });
    }

    const results = await createReportInDB(req.body);
    res.send(results);
    console.log("Reporte enviado");
  } catch (err) {
    console.error("Error durante la creación del reporte:", err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createInspectReport = async (req, res) => {
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
      start_time,
      inspected_areas,
      end_time,
      security_items,
    } = req.body;

    if (
      !location ||
      !date ||
      !name ||
      !dog_name ||
      !corporate ||
      !plant ||
      !shift ||
      !inspection_area ||
      !start_time ||
      !inspected_areas ||
      !end_time ||
      !security_items
    ) {
      return res
        .status(400)
        .json({ message: "Faltan datos del reporte de inspección" });
    }

    const results = await createInspectReportInDB(req.body);
    res.send(results);
    console.log("Reporte de inspección enviado");
  } catch (err) {
    console.error(
      "Error durante la creación del reporte de inspección:",
      err.message
    );
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  createReport,
  createInspectReport,
};
