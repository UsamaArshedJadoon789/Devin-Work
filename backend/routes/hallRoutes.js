const express = require("express");
const router = express.Router();
const hallController = require("../controllers/hallController");

router.get("/", hallController.getAllHalls);
router.post("/add", hallController.addHall);
router.put("/:id", hallController.updateHall);
router.delete("/:id", hallController.deleteHall);

module.exports = router;
