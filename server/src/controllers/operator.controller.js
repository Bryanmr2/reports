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
  const file = req.files?.file ? req.files.file[0] : null;
  const certificacion = req.files?.certificacion
    ? req.files.certificacion[0]
    : null;
  const constancia = req.files?.constancia ? req.files.constancia[0] : null;
  const ine = req.files?.ine ? req.files.ine[0] : null;
  const antecedentes2 = req.files?.antecedentes2
    ? req.files.antecedentes2[0]
    : null;
  const acta = req.files?.acta ? req.files.acta[0] : null;
  const curp_doc = req.files?.curp_doc ? req.files.curp_doc[0] : null;
  const domicilio = req.files?.domicilio ? req.files.domicilio[0] : null;
  const estudios = req.files?.estudios ? req.files.estudios[0] : null;

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
      antecedentes2,
      acta,
      curp_doc,
      domicilio,
      estudios,
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
  const newData = { name, last_name, curp, birth, number, social_number };
  const files = {};
  if (req.files) {
    if (req.files.file) files.file = req.files.file[0];
    if (req.files.certificacion)
      files.certificacion = req.files.certificacion[0];
    if (req.files.constancia) files.constancia = req.files.constancia[0];
    if (req.files.ine) files.ine = req.files.ine[0];
    if (req.files.antecedentes2)
      files.antecedentes2 = req.files.antecedentes2[0];
    if (req.files.acta) files.acta = req.files.acta[0];
    if (req.files.curp_doc) files.curp_doc = req.files.curp_doc[0];
    if (req.files.domicilio) files.domicilio = req.files.domicilio[0];
    if (req.files.estudios) files.estudios = req.files.estudios[0];
  }

  if (req.body.delete_file) files.delete_file = req.body.delete_file;
  if (req.body.delete_certificacion)
    files.delete_certificacion = req.body.delete_certificacion;
  if (req.body.delete_constancia)
    files.delete_constancia = req.body.delete_constancia;
  if (req.body.delete_ine) files.delete_ine = req.body.delete_ine;
  if (req.body.delete_antecedentes2)
    files.delete_antecedentes2 = req.body.delete_antecedentes2;
  if (req.body.delete_acta) files.delete_acta = req.body.delete_acta;
  if (req.body.delete_curp_doc)
    files.delete_curp_doc = req.body.delete_curp_doc;
  if (req.body.delete_domicilio)
    files.delete_domicilio = req.body.delete_domicilio;
  if (req.body.delete_estudios)
    files.delete_estudios = req.body.delete_estudios;

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
