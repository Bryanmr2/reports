const { saveUserInDb, loginUser } = require("../services/authService");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar que los campos necesarios estén presentes
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan datos de usuario" });
    }

    const results = await saveUserInDb(req.body);
    res.send(results);
  } catch (err) {
    console.error("Error durante el registro:", err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    if (user) {
      // Inicio de sesión exitoso
      return res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", user });
    } else {
      // Credenciales inválidas
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (err) {
    console.error("Error en el inicio de sesión:", err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser, login };
