const Router = require("express");
const {
  postInspectionHandler,
} = require("../controllers/inspection.controller");

const router = Router();

router.post("/createInspection", postInspectionHandler);

module.exports = router;
