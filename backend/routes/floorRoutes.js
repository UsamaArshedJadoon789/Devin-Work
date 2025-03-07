const express = require("express");
const router = express.Router();
const floorController = require("../controllers/floorController");

router.get("/", floorController.getAllFloors);
router.get("/hall/:hallId", floorController.getFloorsByHall);
router.post("/add", floorController.addFloor);
router.put("/:id", floorController.updateFloor);
router.delete("/:id", floorController.deleteFloor);

module.exports = router;
