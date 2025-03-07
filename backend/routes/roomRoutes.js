const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get("/", roomController.getAllRooms);
router.post("/add", roomController.addRoom);
router.post("/allocate", roomController.allocateRoom);
router.put("/update-status", roomController.updateRoomStatus);

module.exports = router;