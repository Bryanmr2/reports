const express = require("express");
const router = express.Router();
const {
  getOperatorsHandler,
  postOperatorsHandler,
} = require("../controllers/operator.controller");

router.get("/operator", getOperatorsHandler);
router.post("/operator", postOperatorsHandler);

module.exports = router;
