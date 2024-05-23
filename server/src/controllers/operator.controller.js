const { getOperator, postOperator } = require("../services/operatorService");

const getOperatorsHandler = async (req, res) => {
  try {
    const dogs = await getOperator();
    res.status(200).json(dogs);
  } catch (error) {
    console.error("Error al obtener operadores:", error.message);
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
    console.error("Error al insertar operadores:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getOperatorsHandler, postOperatorsHandler };
