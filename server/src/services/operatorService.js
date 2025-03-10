const supabase = require("../config/supabase");

const getOperatorById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("operator")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error al obtener el manejador:", error.message);
    throw error;
  }
};

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

    // Subir archivo de certificación
    if (operator.certificacion) {
      const filePathCert = `handlers/certificacion/${operatorId}_certificacion.pdf`;
      console.log("Subiendo certificación a:", filePathCert);

      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePathCert, operator.certificacion.buffer, {
          contentType: operator.certificacion.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePathCert);

      const certificacionUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("operator")
        .update({ certificacion_url: certificacionUrl })
        .eq("id", operatorId);

      if (updateError) {
        throw new Error(updateError.message);
      }
    }

    // Subir archivo de constancia
    if (operator.constancia) {
      const filePathConst = `handlers/constancia/${operatorId}_constancia.pdf`;
      console.log("Subiendo constancia a:", filePathConst);

      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePathConst, operator.constancia.buffer, {
          contentType: operator.constancia.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePathConst);

      const constanciaUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("operator")
        .update({ constancia_url: constanciaUrl })
        .eq("id", operatorId);

      if (updateError) {
        throw new Error(updateError.message);
      }
    }

    // Subir archivo de INE
    if (operator.ine) {
      const filePathIne = `handlers/ine/${operatorId}_ine.pdf`;
      console.log("Subiendo INE a:", filePathIne);

      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePathIne, operator.ine.buffer, {
          contentType: operator.ine.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePathIne);

      const ineUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("operator")
        .update({ ine_url: ineUrl })
        .eq("id", operatorId);

      if (updateError) {
        throw new Error(updateError.message);
      }
    }

    if (operator.antecedentes) {
      const filePathAnte = `handlers/antecedentes/${operatorId}_antecedentes.pdf`;
      console.log("Subiendo antecedentes a:", filePathAnte);

      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePathAnte, operator.antecedentes.buffer, {
          contentType: operator.antecedentes.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePathAnte);

      const antecedentesUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("operator")
        .update({ antecedentes_url: antecedentesUrl })
        .eq("id", operatorId);

      if (updateError) {
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

const editOperator = async (operatorId, newData, files) => {
  try {
    // Actualiza primero los campos de texto
    const { data, error } = await supabase
      .from("operator")
      .update(newData)
      .eq("id", operatorId);
    if (error) {
      throw new Error(error.message);
    }

    // Procesa el archivo de Antidoping (campo "file")
    if (files.file) {
      const filePath = `handlers/${operatorId}/document.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePath, files.file.buffer, {
          contentType: files.file.mimetype,
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) throw new Error(uploadError.message);
      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePath);
      const pdfUrl = publicUrlData.publicUrl;
      await supabase
        .from("operator")
        .update({ pdf_url: pdfUrl })
        .eq("id", operatorId);
    } else if (files.delete_file === "true") {
      await supabase
        .from("operator")
        .update({ pdf_url: null })
        .eq("id", operatorId);
    }

    // Procesa Certificación
    if (files.certificacion) {
      const filePathCert = `handlers/certificacion/${operatorId}_certificacion.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePathCert, files.certificacion.buffer, {
          contentType: files.certificacion.mimetype,
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) throw new Error(uploadError.message);
      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePathCert);
      const certificacionUrl = publicUrlData.publicUrl;
      await supabase
        .from("operator")
        .update({ certificacion_url: certificacionUrl })
        .eq("id", operatorId);
    } else if (files.delete_certificacion === "true") {
      await supabase
        .from("operator")
        .update({ certificacion_url: null })
        .eq("id", operatorId);
    }

    // Procesa Constancia
    if (files.constancia) {
      const filePathConst = `handlers/constancia/${operatorId}_constancia.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePathConst, files.constancia.buffer, {
          contentType: files.constancia.mimetype,
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) throw new Error(uploadError.message);
      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePathConst);
      const constanciaUrl = publicUrlData.publicUrl;
      await supabase
        .from("operator")
        .update({ constancia_url: constanciaUrl })
        .eq("id", operatorId);
    } else if (files.delete_constancia === "true") {
      await supabase
        .from("operator")
        .update({ constancia_url: null })
        .eq("id", operatorId);
    }

    // Procesa INE
    if (files.ine) {
      const filePathIne = `handlers/ine/${operatorId}_ine.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePathIne, files.ine.buffer, {
          contentType: files.ine.mimetype,
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) throw new Error(uploadError.message);
      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePathIne);
      const ineUrl = publicUrlData.publicUrl;
      await supabase
        .from("operator")
        .update({ ine_url: ineUrl })
        .eq("id", operatorId);
    } else if (files.delete_ine === "true") {
      await supabase
        .from("operator")
        .update({ ine_url: null })
        .eq("id", operatorId);
    }

    // Procesa Antecedentes
    if (files.antecedentes) {
      const filePathAnte = `handlers/antecedentes/${operatorId}_antecedentes.pdf`;
      console.log("Subiendo antecedentes a:", filePathAnte);
      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePathAnte, files.antecedentes.buffer, {
          contentType: files.antecedentes.mimetype,
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) throw new Error(uploadError.message);
      const { data: publicUrlData } = supabase.storage
        .from("k9-docs")
        .getPublicUrl(filePathAnte);
      const antecedentesUrl = publicUrlData.publicUrl;
      await supabase
        .from("operator")
        .update({ antecedentes_url: antecedentesUrl })
        .eq("id", operatorId);
    } else if (files.delete_antecedentes === "true") {
      await supabase
        .from("operator")
        .update({ antecedentes_url: null })
        .eq("id", operatorId);
    }

    return { message: "Manejador actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar manejador:", error.message);
    throw error;
  }
};

module.exports = {
  getOperator,
  getOperatorById,
  postOperator,
  deleteOperator,
  editOperator,
};
