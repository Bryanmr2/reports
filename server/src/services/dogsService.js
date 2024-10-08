const supabase = require("../config/supabase");

const getDogs = async () => {
  try {
    const { data, error } = await supabase.from("dog").select("*");

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener perros:", error.message);
    throw error;
  }
};

const postDogs = async (dog) => {
  try {
    const { data, error } = await supabase.from("dog").insert([
      {
        name: dog.name,
        breed: dog.breed,
        age: dog.age,
        gender: dog.gender,
        color: dog.color,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
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

module.exports = { getDogs, postDogs, deleteDog, editDog };
