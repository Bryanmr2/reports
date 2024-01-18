const db = require("./db");

const getUsers = async () => {
  const rows = await db.query("SELECT * FROM users");
  console.log(rows);
  return rows;
};

const postUsers = async (user) => {
  try {
    const result = await db.query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [user.id, user.name, user.email, user.password]
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error al insertar usuario:", error.message);
    throw error;
  }
};

module.exports = { getUsers, postUsers };
