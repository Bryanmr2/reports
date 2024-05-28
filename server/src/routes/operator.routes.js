const express = require("express");
const router = express.Router();
const {
  getOperatorsHandler,
  postOperatorsHandler,
  deleteOperatorHandler,
  editOperatorHandler,
} = require("../controllers/operator.controller");

router.get("/operator", getOperatorsHandler);
router.post("/operator", postOperatorsHandler);
router.delete("/operator/:id", deleteOperatorHandler);
router.put("/operator/:id", editOperatorHandler);

module.exports = router;
