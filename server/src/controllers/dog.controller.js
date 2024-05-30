const {
  getDogs,
  postDogs,
  deleteDog,
  editDog,
} = require("../services/dogsService");

const getDogHandler = async (req, res) => {
  try {
    const dogs = await getDogs();
    res.status(200).json(dogs);
  } catch (error) {
    console.error("Error al obtener perros:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const postDogHandler = async (req, res) => {
  const { id, name, breed, age, gender, color } = req.body;
  try {
    const newDog = await postDogs({ id, name, breed, age, gender, color });
    res.status(201).json(newDog);
  } catch (error) {
    console.error("Error al insertar perro:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteDogHandler = async (req, res) => {
  const dogId = req.params.id;
  try {
    await deleteDog(dogId);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar perro:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const editDogHandler = async (req, res) => {
  const dogId = req.params.id;
  const { name, breed, age, gender, color } = req.body;
  try {
    const newData = {
      name: name,
      breed: breed,
      age: age,
      gender: gender,
      color: color,
    };
    await editDog(dogId, newData);
    res.status(200).json({ message: "Perro actualizado correctamente" });
  } catch (error) {
    console.error("Error al editar perro:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDogHandler,
  postDogHandler,
  deleteDogHandler,
  editDogHandler,
};
