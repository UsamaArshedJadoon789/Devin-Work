const Hall = require("../models/Hall");

exports.getAllHalls = async (req, res) => {
  try {
    const halls = await Hall.find();
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching halls", error: error.message });
  }
};

exports.addHall = async (req, res) => {
  try {
    const { name, description, capacity } = req.body;
    const newHall = new Hall({ name, description, capacity });
    await newHall.save();
    res.status(201).json(newHall);
  } catch (error) {
    res.status(500).json({ message: "Error adding hall", error: error.message });
  }
};

exports.updateHall = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, capacity } = req.body;
    const hall = await Hall.findByIdAndUpdate(
      id,
      { name, description, capacity },
      { new: true }
    );
    if (!hall) return res.status(404).json({ message: "Hall not found" });
    res.status(200).json(hall);
  } catch (error) {
    res.status(500).json({ message: "Error updating hall", error: error.message });
  }
};

exports.deleteHall = async (req, res) => {
  try {
    const { id } = req.params;
    const hall = await Hall.findByIdAndDelete(id);
    if (!hall) return res.status(404).json({ message: "Hall not found" });
    res.status(200).json({ message: "Hall deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hall", error: error.message });
  }
};
