const Resident = require("../models/Resident");

exports.getAllResidents = async (req, res) => {
  const residents = await Resident.find();
  res.json(residents);
};

exports.addResident = async (req, res) => {
  try {
    const resident = new Resident(req.body);
    await resident.save();
    res.status(201).json(resident);
  } catch (error) {
    res.status(400).json({ message: "Error adding resident", error });
  }
};