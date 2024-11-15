const {
  saveUserInDb,
  loginUser,
  requestResetPassword,
  updatePassword,
} = require("../services/authService");

const registerUser = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan datos de usuario" });
    }

    const results = await saveUserInDb({ name, email, password });
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
      return res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", user });
    } else {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (err) {
    console.error("Error en el inicio de sesión:", err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const requestResetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Correo electrónico es requerido" });
    }

    const result = await requestResetPassword(email);
    res.status(200).json(result);
  } catch (err) {
    console.error(
      "Error al solicitar restablecimiento de contraseña:",
      err.message
    );
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const { accessToken, newPassword } = req.body;
    if (!accessToken || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token de acceso y nueva contraseña son requeridos" });
    }

    const result = await updatePassword(accessToken, newPassword);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error al actualizar la contraseña:", err.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  registerUser,
  login,
  requestResetPasswordController,
  updatePasswordController,
};
