const {
  getDogs,
  postDogs,
  deleteDog,
  editDog,
  getDogById,
} = require("../services/dogsService");

const getDogHandler = async (req, res) => {
  try {
    const dogs = await getDogs();
    res.status(200).json(dogs);
  } catch (error) {
    console.error("Error al obtener k9:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getDogByIdHandler = async (req, res) => {
  const dogId = req.params.id;
  try {
    const dog = await getDogById(dogId);
    if (!dog) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }
    res.status(200).json(dog);
  } catch (error) {
    console.error("Error al obtener el perro:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const postDogHandler = async (req, res) => {
  const { name, breed, age, gender, color } = req.body;
  const file = req.file;

  try {
    const newDog = await postDogs({
      name,
      breed,
      age,
      gender,
      color,
      file,
    });
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
  getDogByIdHandler,
  getDogHandler,
  postDogHandler,
  deleteDogHandler,
  editDogHandler,
};
