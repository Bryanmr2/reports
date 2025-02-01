const express = require("express");
const router = express.Router();
const {
  getOperatorByIdHandler,
  getOperatorsHandler,
  postOperatorsHandler,
  deleteOperatorHandler,
  editOperatorHandler,
} = require("../controllers/operator.controller");

router.get("/operator", getOperatorsHandler);
router.get(
  "/operator/:id",
  (req, res, next) => {
    console.log(`Solicitud para obtener operador con ID: ${req.params.id}`);
    next();
  },
  getOperatorByIdHandler
);

router.post("/operator", postOperatorsHandler);

router.delete("/operator/:id", deleteOperatorHandler);

router.put("/operator/:id", editOperatorHandler);

module.exports = router;
