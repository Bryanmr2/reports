const express = require("express");
const router = express.Router();
const {
  getDogsHandler,
  postDogsHandler,
} = require("../controllers/dog.controller");

router.get("/dogs", getDogsHandler);
router.post("/dogs", postDogsHandler);

module.exports = router;
