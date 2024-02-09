const Router = require("express");
const { createReport } = require("../controllers/reports.controller");

const router = Router();

router.post("/createReport", createReport);

module.exports = router;
