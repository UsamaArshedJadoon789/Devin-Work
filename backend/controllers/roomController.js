const Room = require("../models/Room");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ rooms }); // Return rooms in an object with 'rooms' property
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
};

exports.addRoom = async (req, res) => {
  try {
    const { number, type, hall, floor, price, status } = req.body;
    const newRoom = new Room({ number, type, hall, floor, price, status });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error: error.message });
  }
};

exports.allocateRoom = async (req, res) => {
  try {
    const { residentId, roomId, bookedBy, arrivalDate, departureDate } = req.body;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.status = "occupied";
    room.bookedBy = bookedBy;
    room.arrivalDate = arrivalDate;
    room.departureDate = departureDate;
    await room.save();

    res.status(200).json({ message: "Room allocated successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error allocating room", error: error.message });
  }
};

exports.updateRoomStatus = async (req, res) => {
  try {
    const { roomId, status } = req.body;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.status = status;
    await room.save();

    res.status(200).json({ message: "Room status updated successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error updating room status", error: error.message });
  }
};
