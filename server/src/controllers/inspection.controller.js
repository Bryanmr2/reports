const {
  createInspection,
  getInspection,
} = require("../services/inspectionService");

const postInspectionHandler = async (req, res) => {
  try {
    const inspection = req.body;
    if (!inspection.inspection_type) {
      return res.status(400).json({ message: "Type is required" });
    }

    const response = await createInspection(inspection);

    res.status(201).json(response);
  } catch (err) {
    console.error("Error durante la creación del reporte:", err.message);
    res.status(500).json({ message: "Error en el servidor" }); 
  }
};

const getInspectionHandler = async (req, res) => {
  try {
    const inspections = await getInspection();
    res.status(200).json(inspections);
  } catch (err) {
    console.error("Error al obtener las inspecciones:", err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  postInspectionHandler,
  getInspectionHandler,
};
