const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const register = async (name, email, password, res) => {
  try {
    if (!res) {
      throw new Error("La variable 'res' no está definida");
    }

    const [results, fields] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    console.log("Usuario registrado exitosamente");
    res.status(201).send("Usuario registrado exitosamente");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.error("Correo electrónico duplicado:", error);
      res.status(400).send("El correo electrónico ya está registrado");
    } else {
      console.error("Error al registrar usuario:", error);
      res.status(500).send("Error al registrar usuario");
    }
  }
};
module.exports = { register };
