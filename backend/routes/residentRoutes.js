const express = require("express");
const { getAllResidents, addResident } = require("../controllers/residentController");
const router = express.Router();

router.get("/", getAllResidents);
router.post("/", addResident);

module.exports = router;
