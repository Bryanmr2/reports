const db = require("./db");

const saveUserInDb = async (user) => {
  try {
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );
    return result;
  } catch (error) {
    console.error("Error al insertar usuario:", error.message);
    throw error;
  }
};

const loginUser = async (credentials) => {
  try {
    const { email, password } = credentials;
    const user = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      // Usuario no encontrado
      return null;
    }
    if (user[0].password === password) {
      // Contraseña válida, retornar información del usuario
      return user[0];
    } else {
      // Contraseña incorrecta
      return null;
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
    throw error;
  }
};

module.exports = { saveUserInDb, loginUser };
