const { getDogs, postDogs } = require("../services/dogsService");

const getDogsHandler = async (req, res) => {
  try {
    const dogs = await getDogs();
    res.status(200).json(dogs);
  } catch (error) {
    console.error("Error al obtener perros:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const postDogsHandler = async (req, res) => {
  const { id, name, breed, age, gender, color } = req.body;
  try {
    const newDog = await postDogs({ id, name, breed, age, gender, color });
    res.status(201).json(newDog);
  } catch (error) {
    console.error("Error al insertar perro:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogsHandler, postDogsHandler };
