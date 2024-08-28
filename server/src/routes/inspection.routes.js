const Router = require("express");
const {
  getInspectionHandler,
  postInspectionHandler,
  deleteInspectionHandler,
} = require("../controllers/inspection.controller");

const router = Router();

router.get("/inspections", getInspectionHandler);
router.post("/createInspection", postInspectionHandler);
router.delete("/inspections/:id", deleteInspectionHandler);

module.exports = router;
