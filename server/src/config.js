const dotenv = require("dotenv");
dotenv.config();

const config = {
  db: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
module.exports = config;
