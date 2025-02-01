const express = require("express");
const router = express.Router();
const {
  getDogByIdHandler,
  getDogHandler,
  postDogHandler,
  deleteDogHandler,
  editDogHandler,
} = require("../controllers/dog.controller");

router.get("/dog", getDogHandler);
router.get("/dog/:id", getDogByIdHandler);

router.post("/dog", postDogHandler);

router.delete("/dog/:id", deleteDogHandler);

router.put("/dog/:id", editDogHandler);

module.exports = router;
