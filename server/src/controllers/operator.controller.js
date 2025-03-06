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
    });
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
  try {
    const newData = {
      name: name,
      last_name: last_name,
      curp: curp,
      birth: birth,
      number: number,
      social_number: social_number,
    };
    await editOperator(operatorId, newData);
    res.status(200).json({ message: "Manejador actualizado correctamente" });
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
