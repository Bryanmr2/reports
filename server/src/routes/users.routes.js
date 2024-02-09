const express = require("express");
const router = express.Router();
const { getUser, postUser } = require("../controllers/userController");

router.get("/users", getUser);
router.post("/users", postUser);

module.exports = router;
