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
    console.error("Error al obtener manejador:", error.message);
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
    console.error("Error al insertar manejador:", error.message);
    throw error;
  }
};

const deleteOperator = async (operatorId) => {
  try {
    const { error } = await supabase
      .from("operator")
      .delete()
      .eq("id", operatorId);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error al eliminar manejador:", error.message);
    throw error;
  }
};

const editOperator = async (operatorId, newData) => {
  try {
    const { data, error } = await supabase
      .from("operator")
      .update(newData)
      .eq("id", operatorId);

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al actualizar manejador:", error.message);
    throw error;
  }
};

module.exports = { getOperator, postOperator, deleteOperator, editOperator };
