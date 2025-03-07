const Report = require("../models/Report");
const Room = require("../models/Room");


exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const { title, startDate, endDate, hall } = req.body;

    // Convert start and end date to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Find occupied rooms within the selected time period
    const occupiedRooms = await Room.find({
      status: "occupied",
      arrivalDate: { $lte: end },
      departureDate: { $gte: start }
    });

    // Calculate total occupancy
    const totalOccupancy = occupiedRooms.length;

    // Calculate total income (assuming 'price' is rent per room)
    const totalIncome = occupiedRooms.reduce((sum, room) => sum + room.price, 0);
    // Create new report with calculated data
    const newReport = new Report({
      title,
      startDate,
      endDate,
      hall,
      income: totalIncome,
      occupancy: totalOccupancy
    });

    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: "Error generating report", error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error: error.message });
  }
};
