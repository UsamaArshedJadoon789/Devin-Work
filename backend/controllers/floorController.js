const Floor = require("../models/Floor");

exports.getAllFloors = async (req, res) => {
  try {
    const floors = await Floor.find().populate("hallId");
    res.status(200).json(floors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching floors", error: error.message });
  }
};

exports.getFloorsByHall = async (req, res) => {
  try {
    const { hallId } = req.params;
    const floors = await Floor.find({ hallId }).populate("hallId");
    res.status(200).json(floors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching floors", error: error.message });
  }
};

exports.addFloor = async (req, res) => {
  try {
    const { name, hallId, level } = req.body;
    const newFloor = new Floor({ name, hallId, level });
    await newFloor.save();
    res.status(201).json(newFloor);
  } catch (error) {
    res.status(500).json({ message: "Error adding floor", error: error.message });
  }
};

exports.updateFloor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, hallId, level } = req.body;
    const floor = await Floor.findByIdAndUpdate(
      id,
      { name, hallId, level },
      { new: true }
    );
    if (!floor) return res.status(404).json({ message: "Floor not found" });
    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({ message: "Error updating floor", error: error.message });
  }
};

exports.deleteFloor = async (req, res) => {
  try {
    const { id } = req.params;
    const floor = await Floor.findByIdAndDelete(id);
    if (!floor) return res.status(404).json({ message: "Floor not found" });
    res.status(200).json({ message: "Floor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting floor", error: error.message });
  }
};
