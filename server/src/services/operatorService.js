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
    const { data: operatorData, error: insertError } = await supabase
      .from("operator")
      .insert([
        {
          name: operator.name,
          last_name: operator.last_name,
          curp: operator.curp,
          birth: operator.birth,
          number: operator.number,
          social_number: operator.social_number,
        },
      ])
      .select("id");

    if (insertError) {
      throw new Error(insertError.message);
    }

    const operatorId = operatorData[0].id;

    if (operator.file) {
      const filePath = `handlers/${operatorId}/document.pdf`;
      console.log("Subiendo archivo a:", filePath);

      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePath, operator.file.buffer, {
          contentType: operator.file.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("Error al subir archivo:", uploadError.message);
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePath);

      const pdfUrl = publicUrlData.publicUrl;

      console.log("URL del PDF del manejador:", pdfUrl);

      const { error: updateError } = await supabase
        .from("operator")
        .update({ pdf_url: pdfUrl })
        .eq("id", operatorId);

      if (updateError) {
        console.error("Error al actualizar URL del PDF:", updateError.message);
        throw new Error(updateError.message);
      }
    }

    return { message: "Manejador creado correctamente", operatorId };
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
