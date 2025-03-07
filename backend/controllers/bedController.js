const Bed = require("../models/Bed");

exports.getAllBeds = async (req, res) => {
  try {
    const beds = await Bed.find().populate("roomId");
    res.status(200).json(beds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching beds", error: error.message });
  }
};

exports.getBedsByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const beds = await Bed.find({ roomId }).populate("roomId");
    res.status(200).json(beds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching beds", error: error.message });
  }
};

exports.addBed = async (req, res) => {
  try {
    const { number, roomId, status } = req.body;
    const newBed = new Bed({ number, roomId, status });
    await newBed.save();
    res.status(201).json(newBed);
  } catch (error) {
    res.status(500).json({ message: "Error adding bed", error: error.message });
  }
};

exports.updateBed = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, roomId, status } = req.body;
    const bed = await Bed.findByIdAndUpdate(
      id,
      { number, roomId, status },
      { new: true }
    );
    if (!bed) return res.status(404).json({ message: "Bed not found" });
    res.status(200).json(bed);
  } catch (error) {
    res.status(500).json({ message: "Error updating bed", error: error.message });
  }
};

exports.deleteBed = async (req, res) => {
  try {
    const { id } = req.params;
    const bed = await Bed.findByIdAndDelete(id);
    if (!bed) return res.status(404).json({ message: "Bed not found" });
    res.status(200).json({ message: "Bed deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bed", error: error.message });
  }
};
