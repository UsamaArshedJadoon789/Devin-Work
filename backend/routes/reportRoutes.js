const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController"); // ✅ Ensure correct path

router.get("/", reportController.getAllReports);
router.post("/create", reportController.createReport);
router.delete("/:id", reportController.deleteReport);


module.exports = router;

  