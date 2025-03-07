const mongoose = require('mongoose');
const Room = require('../models/Room');

const rooms = [
  // Bachelor Hall - Lower Ground
  {
    number: "BLG-01",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-02",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-03",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-04",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-05",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-06",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-07",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-08",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-09",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-10",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-11",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BLG-12",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Lower Ground",
    price: 4000,
    status: "available"
  },

  // Bachelor Hall - Ground Floor
  {
    number: "BGF-01",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-02",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-03",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-04",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-05",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-06",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-07",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-08",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-09",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-10",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-11",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },
  {
    number: "BGF-12",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Ground",
    price: 4000,
    status: "available"
  },

  // Bachelor Hall - First Floor
  {
    number: "BFF-101",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-102",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-103",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-104",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-105",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-106",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-107",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-108",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-109",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-110",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-111",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },
  {
    number: "BFF-112",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "First",
    price: 4000,
    status: "available"
  },

  // Bachelor Hall - Second Floor
  {
    number: "BSF-201",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-202",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-203",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-204",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-205",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-206",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-207",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-208",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-209",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-210",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-211",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },
  {
    number: "BSF-212",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Second",
    price: 2500,
    status: "available"
  },

  // Bachelor Hall - Third Floor
  {
    number: "BTF-301",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-302",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-303",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-304",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-305",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-306",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-307",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-308",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-309",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-310",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-311",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  },
  {
    number: "BTF-312",
    type: "Guest",
    hall: "Bachelor Hall",
    floor: "Third",
    price: 2500,
    status: "available"
  }
];

// Export rooms for mock data
module.exports = { rooms };

mongoose.connect('mongodb://localhost:27017/hostel_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  try {
    // Clear existing rooms
    await Room.deleteMany({});
    // Insert new rooms
    await Room.insertMany(rooms);
    console.log('Bachelor Hall rooms populated successfully');
  } catch (error) {
    console.error('Error populating rooms:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(error => console.error('Connection error:', error)); 
