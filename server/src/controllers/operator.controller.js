const {
  getOperator,
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

const postOperatorsHandler = async (req, res) => {
  const { id, name, last_name, curp, birth, number, adress } = req.body;
  try {
    const newOperator = await postOperator({
      id,
      name,
      last_name,
      curp,
      birth,
      number,
      adress,
    });
    res.status(201).json(newOperator);
  } catch (error) {
    console.error("Error al insertar manejadores:", error.message);
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
  const { name, last_name, curp, birth, number, address } = req.body;
  try {
    const newData = {
      name: name,
      last_name: last_name,
      curp: curp,
      birth: birth,
      number: number,
      address: address,
    };
    await editOperator(operatorId, newData);
    res.status(200).json({ message: "Manejador actualizado correctamente" });
  } catch (error) {
    console.error("Error al editar Manejador:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOperatorsHandler,
  postOperatorsHandler,
  deleteOperatorHandler,
  editOperatorHandler,
};
