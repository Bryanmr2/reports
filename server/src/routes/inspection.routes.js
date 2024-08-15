const Router = require("express");
const {
  getInspectionHandler,
  postInspectionHandler,
} = require("../controllers/inspection.controller");

const router = Router();

router.get("/inspections", getInspectionHandler);
router.post("/createInspection", postInspectionHandler);

module.exports = router;
