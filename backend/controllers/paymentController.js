const Payment = require("../models/Payment");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("residentId")
      .populate("roomId");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

exports.getPaymentsByResident = async (req, res) => {
  try {
    const { residentId } = req.params;
    const payments = await Payment.find({ residentId })
      .populate("residentId")
      .populate("roomId");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

exports.addPayment = async (req, res) => {
  try {
    const { residentId, roomId, amount, paymentDate, paymentMethod, receiptNumber, status } = req.body;
    const newPayment = new Payment({ 
      residentId, 
      roomId, 
      amount, 
      paymentDate, 
      paymentMethod, 
      receiptNumber, 
      status 
    });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: "Error adding payment", error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { residentId, roomId, amount, paymentDate, paymentMethod, receiptNumber, status } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      id,
      { residentId, roomId, amount, paymentDate, paymentMethod, receiptNumber, status },
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error updating payment", error: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error: error.message });
  }
};
