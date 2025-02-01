const supabase = require("../config/supabase");

const getDogById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("dog")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error al obtener el perro:", error.message);
    throw error;
  }
};

const getDogs = async () => {
  try {
    const { data, error } = await supabase.from("dog").select("*");

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener k9:", error.message);
    throw error;
  }
};

const postDogs = async (dog) => {
  try {
    const { data: dogData, error: insertError } = await supabase
      .from("dog")
      .insert([
        {
          name: dog.name,
          breed: dog.breed,
          age: dog.age,
          gender: dog.gender,
          color: dog.color,
        },
      ])
      .select("id");

    if (insertError) {
      throw new Error(insertError.message);
    }

    const dogId = dogData[0].id;

    if (dog.file) {
      const filePath = `dogs/${dogId}/vaccines.pdf`;
      console.log("Subiendo archivo a:", filePath);
      const { error: uploadError } = await supabase.storage
        .from("k9-docs")
        .upload(filePath, dog.file.buffer, {
          contentType: dog.file.mimetype,
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
      console.log("URL del PDF:", pdfUrl);

      const { error: updateError } = await supabase
        .from("dog")
        .update({ pdf_url: pdfUrl })
        .eq("id", dogId);

      if (updateError) {
        console.error("Error al actualizar URL del PDF:", updateError.message);
        throw new Error(updateError.message);
      }
    }

    return { message: "K9 creado correctamente", dogId };
  } catch (error) {
    console.error("Error al insertar perro:", error.message);
    throw error;
  }
};

const deleteDog = async (dogId) => {
  try {
    const { error } = await supabase.from("dog").delete().eq("id", dogId);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error al eliminar perro:", error.message);
    throw error;
  }
};

const editDog = async (dogId, newData) => {
  try {
    const { data, error } = await supabase
      .from("dog")
      .update(newData)
      .eq("id", dogId);

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al editar perro:", error.message);
    throw error;
  }
};

module.exports = { getDogs, postDogs, deleteDog, editDog, getDogById };
