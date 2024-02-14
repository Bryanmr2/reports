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
      inspection_description,
      shipment_type,
      carrier_company,
      operator_name,
      tractor_brand,
      tractor_color,
      tractor_model,
      tractor_plate,
      tractor_number,
      trailer_number,
      shipment_number,
      total_skids,
      stamps_number,
      security_company,
      guard_names,
      custody_company,
      custodian_names,
      custody_unit_number,
      departure_time,
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
      !inspection_description ||
      !shipment_type ||
      !carrier_company ||
      !operator_name ||
      !tractor_brand ||
      !tractor_color ||
      !tractor_model ||
      !tractor_plate ||
      !tractor_number ||
      !trailer_number ||
      !shipment_number ||
      !total_skids ||
      !stamps_number ||
      !security_company ||
      !guard_names ||
      !custody_company ||
      !custodian_names ||
      !custody_unit_number ||
      !departure_time ||
      !start_time ||
      !inspected_areas ||
      !end_time ||
      !security_items
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
