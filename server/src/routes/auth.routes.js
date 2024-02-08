const Router = require("express");
const { login, registerUser } = require("../controllers/auth.controller");

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
