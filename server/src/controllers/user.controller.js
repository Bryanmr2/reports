const { getUsers, postUsers } = require("../services/userService");

const getUser = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (err) {
    console.log("error");
  }
};

const postUser = async (req, res, next) => {
  try {
    const results = await postUsers(req.body);
    res.send(results);
  } catch (err) {
    console.log("error");
  }
};

module.exports = { getUser, postUser };
