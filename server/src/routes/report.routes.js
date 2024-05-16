const Router = require("express");
const {
  createReport,
  createInspectReport,
} = require("../controllers/reports.controller");

const router = Router();

router.post("/createReport", createReport);
router.post("/createInspectReport", createInspectReport);

module.exports = router;
