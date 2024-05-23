const supabase = require("../config/supabase");

const getOperator = async () => {
  try {
    const { data, error } = await supabase.from("operator").select("*");

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener operador:", error.message);
    throw error;
  }
};

const postOperator = async (operator) => {
  try {
    const { data, error } = await supabase.from("operator").insert([
      {
        name: operator.name,
        last_name: operator.last_name,
        curp: operator.curp,
        birth: operator.birth,
        number: operator.number,
        adress: operator.adress,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al insertar operador:", error.message);
    throw error;
  }
};

module.exports = { getOperator, postOperator };
