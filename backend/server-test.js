const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mock JWT Secret
const JWT_SECRET = '42b1596fa1e7e0cf0ed7b374356cc87247ed98cfd9b9ec81128156a1e1cd5bb9';

// Mock user data
const mockUser = {
  _id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  profilePicture: 'default.jpg'
};

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Accept any credentials for testing
  const token = jwt.sign(
    { id: mockUser._id, email: mockUser.email, role: mockUser.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({
    success: true,
    token,
    user: mockUser
  });
});

// Get user profile endpoint
app.get('/api/auth/profile', (req, res) => {
  res.json({
    success: true,
    user: mockUser
  });
});

// Mock halls data
const mockHalls = [
  { _id: '1', name: 'Hall A', status: 'active', totalFloors: 3 },
  { _id: '2', name: 'Hall B', status: 'active', totalFloors: 2 },
  { _id: '3', name: 'Hall C', status: 'maintenance', totalFloors: 4 }
];

// Get halls endpoint
app.get('/api/halls', (req, res) => {
  res.json({
    success: true,
    halls: mockHalls
  });
});

// Mock floors data
const mockFloors = [
  { _id: '1', hallId: '1', floorNumber: 1, status: 'active', totalRooms: 10 },
  { _id: '2', hallId: '1', floorNumber: 2, status: 'active', totalRooms: 8 },
  { _id: '3', hallId: '2', floorNumber: 1, status: 'maintenance', totalRooms: 12 }
];

// Get floors endpoint
app.get('/api/floors', (req, res) => {
  res.json({
    success: true,
    floors: mockFloors
  });
});

// Mock rooms data
const mockRooms = [
  { _id: '1', hallId: '1', floorId: '1', roomNumber: 101, status: 'occupied', totalBeds: 4 },
  { _id: '2', hallId: '1', floorId: '1', roomNumber: 102, status: 'available', totalBeds: 2 },
  { _id: '3', hallId: '2', floorId: '3', roomNumber: 301, status: 'maintenance', totalBeds: 3 }
];

// Get rooms endpoint
app.get('/api/rooms', (req, res) => {
  res.json({
    success: true,
    rooms: mockRooms
  });
});

// Mock beds data
const mockBeds = [
  { _id: '1', hallId: '1', floorId: '1', roomId: '1', bedNumber: 1, status: 'occupied' },
  { _id: '2', hallId: '1', floorId: '1', roomId: '1', bedNumber: 2, status: 'available' },
  { _id: '3', hallId: '2', floorId: '3', roomId: '3', bedNumber: 1, status: 'maintenance' }
];

// Get beds endpoint
app.get('/api/beds', (req, res) => {
  res.json({
    success: true,
    beds: mockBeds
  });
});

// Mock payments data
const mockPayments = [
  { _id: '1', residentId: '1', roomId: '1', amount: 5000, paymentDate: '2023-01-15', paymentMethod: 'Cash', receiptNumber: 'REC001', status: 'completed' },
  { _id: '2', residentId: '2', roomId: '2', amount: 4500, paymentDate: '2023-02-10', paymentMethod: 'Bank Transfer', receiptNumber: 'REC002', status: 'pending' },
  { _id: '3', residentId: '3', roomId: '3', amount: 5500, paymentDate: '2023-03-05', paymentMethod: 'Credit Card', receiptNumber: 'REC003', status: 'completed' }
];

// Get payments endpoint
app.get('/api/payments', (req, res) => {
  res.json({
    success: true,
    payments: mockPayments
  });
});

// Mock residents data
const mockResidents = [
  { _id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', roomId: '1', status: 'active' },
  { _id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', roomId: '2', status: 'active' },
  { _id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '5555555555', roomId: '3', status: 'inactive' }
];

// Get residents endpoint
app.get('/api/residents', (req, res) => {
  res.json({
    success: true,
    residents: mockResidents
  });
});

// Mock dashboard data
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalResidents: 45,
      occupiedRooms: 28,
      availableRooms: 12,
      maintenanceRooms: 5,
      totalIncome: 225000,
      pendingPayments: 35000,
      occupancyRate: 70
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
