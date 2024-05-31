const Router = require("express");
const { createInspection } = require("../controllers/reports.controller");

const router = Router();

router.post("/createInspection", createInspection);

module.exports = router;
