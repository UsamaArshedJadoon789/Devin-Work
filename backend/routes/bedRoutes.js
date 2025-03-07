const express = require("express");
const router = express.Router();
const bedController = require("../controllers/bedController");

router.get("/", bedController.getAllBeds);
router.get("/room/:roomId", bedController.getBedsByRoom);
router.post("/add", bedController.addBed);
router.put("/:id", bedController.updateBed);
router.delete("/:id", bedController.deleteBed);

module.exports = router;
