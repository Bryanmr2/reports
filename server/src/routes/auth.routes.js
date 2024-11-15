const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  requestResetPasswordController,
  updatePasswordController,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset-password", requestResetPasswordController);
router.post("/update-password", updatePasswordController);

module.exports = router;
