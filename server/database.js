import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUserByID(id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error.message);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    return rows[0];
  } catch (error) {
    console.error(
      "Error al obtener usuario por correo electrónico:",
      error.message
    );
    throw error;
  }
}
