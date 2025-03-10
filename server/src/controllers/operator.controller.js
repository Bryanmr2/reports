const {
  getOperator,
  getOperatorById,
  postOperator,
  deleteOperator,
  editOperator,
} = require("../services/operatorService");

const getOperatorsHandler = async (req, res) => {
  try {
    const operator = await getOperator();
    res.status(200).json(operator);
  } catch (error) {
    console.error("Error al obtener manejadores:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getOperatorByIdHandler = async (req, res) => {
  const operatorId = req.params.id;
  console.log(`Handler: obteniendo operador con ID: ${operatorId}`);
  try {
    const operator = await getOperatorById(operatorId);
    if (!operator) {
      console.log(`Operador con ID: ${operatorId} no encontrado`);
      return res.status(404).json({ message: "Manejador no encontrado" });
    }
    res.status(200).json(operator);
  } catch (error) {
    console.error("Error al obtener el manejador:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const postOperatorsHandler = async (req, res) => {
  const { id, name, last_name, curp, birth, number, social_number } = req.body;

  // Se obtienen los archivos enviados, incluyendo antecedentes
  const file = req.files?.file ? req.files.file[0] : null;
  const certificacion = req.files?.certificacion
    ? req.files.certificacion[0]
    : null;
  const constancia = req.files?.constancia ? req.files.constancia[0] : null;
  const ine = req.files?.ine ? req.files.ine[0] : null;
  const antecedentes = req.files?.antecedentes
    ? req.files.antecedentes[0]
    : null; // Nota: revisar ortografía si es necesario
  console.log("Archivo de antecedentes recibido:", antecedentes ? "SÍ" : "NO");
  if (antecedentes) {
    console.log("Detalles del archivo:", {
      nombre: antecedentes.originalname,
      tamaño: antecedentes.size,
      tipo: antecedentes.mimetype,
    });
  }

  try {
    const newOperator = await postOperator({
      id,
      name,
      last_name,
      curp,
      birth,
      number,
      social_number,
      file,
      certificacion,
      constancia,
      ine,
      antecedentes: antecedentes, // se envía el archivo de antecedentes
    });
    console.log("Archivos recibidos en req.files:", req.files);
    res.status(201).json(newOperator);
  } catch (error) {
    console.error("Error al insertar manejador:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteOperatorHandler = async (req, res) => {
  const operatorId = req.params.id;
  try {
    await deleteOperator(operatorId);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar manejador:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const editOperatorHandler = async (req, res) => {
  const operatorId = req.params.id;
  const { name, last_name, curp, birth, number, social_number } = req.body;

  // Preparamos los datos de texto
  const newData = { name, last_name, curp, birth, number, social_number };

  // Preparamos un objeto para los archivos a partir de req.files
  const files = {};
  if (req.files) {
    if (req.files.file) files.file = req.files.file[0];
    if (req.files.certificacion)
      files.certificacion = req.files.certificacion[0];
    if (req.files.constancia) files.constancia = req.files.constancia[0];
    if (req.files.ine) files.ine = req.files.ine[0];
    if (req.files.antecedentes) files.antecedentes = req.files.antecedentes[0]; // archivo de antecedentes
  }

  // Si en el FormData se envían flags para eliminar archivos, se incluyen
  if (req.body.delete_file) files.delete_file = req.body.delete_file;
  if (req.body.delete_certificacion)
    files.delete_certificacion = req.body.delete_certificacion;
  if (req.body.delete_constancia)
    files.delete_constancia = req.body.delete_constancia;
  if (req.body.delete_ine) files.delete_ine = req.body.delete_ine;
  if (req.body.delete_antecedentes)
    files.delete_antecedentes = req.body.delete_antecedentes; // flag para eliminar antecedentes

  try {
    const result = await editOperator(operatorId, newData, files);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al editar Manejador:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOperatorByIdHandler,
  getOperatorsHandler,
  postOperatorsHandler,
  deleteOperatorHandler,
  editOperatorHandler,
};
