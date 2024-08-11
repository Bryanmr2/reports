const Router = require("express");
const {
  getInspectionHandler,
  postInspectionHandler,
} = require("../controllers/inspection.controller");

const router = Router();

router.get("/createInspection", getInspectionHandler);
router.post("/createInspection", postInspectionHandler);

module.exports = router;
