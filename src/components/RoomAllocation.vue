<template>
  <div class="register-container">
    <h2 class="title">Room Allocation</h2>

    <!-- Resident Selection -->
    <div v-if="!selectedRegistration" class="registration-list-section">
      <div class="search-header">
        <div class="search-box">
          <label class="floating-label">Search Resident</label>
          <input
            type="text"
            v-model="searchQuery"
            class="form-input search-input"
            placeholder="Search by name or CNIC"
            @input="filterRegistrations"
          />
        </div>
      </div>

      <!-- Registrations Table -->
      <div class="table-wrapper">
        <table class="registrations-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>CNIC</th>
              <th>Role</th>
              <th>Department</th>
              <th>Referred By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resident in filteredRegistrations" :key="resident._id">
              <td>{{ resident.name }}</td>
              <td>{{ resident.nicOrPassport }}</td>
              <td>{{ resident.role }}</td>
              <td>{{ resident.department }}</td>
              <td>{{ resident.referredBy }}</td>
              <td>
                <button @click="selectRegistration(resident)" class="select-btn">
                  Select
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Selected Resident Info -->
    <div v-if="selectedRegistration" class="selected-registration">
      <div class="info-card">
        <div class="info-details">
          <h3>Selected Resident</h3>
          <p><strong>Name:</strong> {{ selectedRegistration.name }}</p>
          <p><strong>CNIC:</strong> {{ selectedRegistration.nicOrPassport }}</p>
          <p><strong>Role:</strong> {{ selectedRegistration.role }}</p>
          <p><strong>Department:</strong> {{ selectedRegistration.department }}</p>
          <p><strong>Referred By:</strong> {{ selectedRegistration.referredBy }}</p>
        </div>
        <button @click="clearSelection" class="change-btn">Change Selection</button>
      </div>

      <!-- Room Allocation Form -->
      <form @submit.prevent="handleRoomAllocation" class="grid">
        <div class="form-group">
          <label class="floating-label">Hall</label>
          <select v-model="selectedHall" class="form-input" @change="selectedFloor = ''">
            <option value="" disabled>Select Hall</option>
            <option v-for="(floors, hall) in hallFloors" :key="hall" :value="hall">
              {{ hall }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="floating-label">Floor</label>
          <select v-model="selectedFloor" class="form-input" :disabled="!selectedHall">
            <option value="" disabled>Select Floor</option>
            <option v-for="floor in availableFloors" :key="floor" :value="floor">
              {{ floor }}
            </option>
          </select>
        </div>
<!-- {{ rooms }} -->
<div class="form-group">
  <label for="roomSelect" class="floating-label">Select Room</label>
  <select id="roomSelect" v-model="selectedRoom" class="form-input room-dropdown">
    <option value="">Select a Room</option>
    <option v-for="room in availableRooms" :key="room._id" :value="room._id">
      {{ room.number }} - {{ room.hall }} ({{ room.type }})
    </option>
  </select>
</div>

        <div class="form-group">
          <label class="floating-label">Booked By</label>
          <input v-model="bookedBy" type="text" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="floating-label">Arrival Date</label>
          <input v-model="arrivalDate" type="date" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="floating-label">Departure Date</label>
          <input v-model="departureDate" type="date" class="form-input" required />
        </div>

        <button type="submit" class="submit-button" :disabled="!isFormValid">
          Allocate Room
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomAllocation",
  data() {
    return {
      residents: [],
      rooms: [],
      searchQuery: "",
      selectedRegistration: null,
      selectedHall: "",
      selectedFloor: "",
      selectedRoom: "",
      bookedBy: "",
      arrivalDate: "",
      departureDate: "",
      loading: false,
      error: null,
      hallFloors: {
        "Bachelor Hall": ["Lower Ground", "Ground", "First", "Second", "Third"],
        "Jinnah Hall": ["Ground Floor", "First Floor", "Executive Rooms"],
        "Liaquat Hall": ["Ground Floor", "First Floor", "Executive Rooms"]
      }
    };
  },
  computed: {
    filteredRegistrations() {
      const query = this.searchQuery.toLowerCase();
      return this.residents.filter(resident =>
        resident.name.toLowerCase().includes(query) || resident.nicOrPassport.includes(query)
      );
    },
    availableFloors() {
      return this.hallFloors[this.selectedHall] || [];
    },
    availableRooms() {
      if (!this.selectedFloor || !this.selectedHall) return [];
      return this.rooms.filter(room => 
        room.hall === this.selectedHall && 
        room.floor === this.selectedFloor &&
        room.status === "available"
      );
    },
    isFormValid() {
      return this.selectedHall && this.selectedFloor && this.selectedRoom && this.bookedBy && this.arrivalDate && this.departureDate;
    }
  },
  methods: {
    async fetchResidents() {
      try {
        const response = await axios.get("http://localhost:5000/api/residents");
        this.residents = response.data;
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    },
    async fetchRooms() {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        
        // Check if response.data has a 'rooms' property (API returns {rooms: [...]} format)
        if (response.data && response.data.rooms && Array.isArray(response.data.rooms)) {
          this.rooms = response.data.rooms;
          console.log("Rooms fetched from API:", this.rooms.length);
        } else if (Array.isArray(response.data)) {
          // Fallback for direct array response
          this.rooms = response.data;
          console.log("Rooms fetched (direct array):", this.rooms.length);
        } else {
          console.error("Invalid API response format:", response.data);
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
        alert("Failed to load rooms. Check console for details.");
      }
    },
    selectRegistration(resident) {
      this.selectedRegistration = resident;
    },
    clearSelection() {
      this.selectedRegistration = null;
    },
    async handleRoomAllocation() {
      try {
        const response = await axios.post("http://localhost:5000/api/rooms/allocate", {
          residentId: this.selectedRegistration._id,
          roomId: this.selectedRoom,
          bookedBy: this.bookedBy,
          arrivalDate: this.arrivalDate,
          departureDate: this.departureDate
        });
        alert("Room allocated successfully!");
        this.clearSelection();
        this.fetchRooms();
      } catch (error) {
        console.error("Error allocating room:", error);
      }
    }
  },
  mounted() {
    this.fetchResidents();
    this.fetchRooms();
  }
};
</script>


<style scoped>
/* 📌 Main Container */
.register-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 70px);
  width: 100%;
  box-sizing: border-box;
}

/* 📌 Title */
.title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
}

/* 📌 Form Layout */
.allocation-form {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* 📌 Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 3rem;
  margin-bottom: 2rem;
}

/* 📌 Form Group */
.form-group {
  position: relative;
  height: 80px;
  margin-bottom: 1rem;
}

/* 📌 Inputs */
.form-input {
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease;
  margin-top: 20px;
}

/* 📌 Focus Effects */
.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* 📌 Floating Labels */
.floating-label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.9rem;
  color: #666;
  background: transparent;
  z-index: 2;
}

/* 📌 Buttons */
.button-container {
  margin-top: auto;
  text-align: center;
  padding: 2rem 0;
}

.submit-btn {
  padding: 0.75rem 3rem;
  font-size: 1.1rem;
  color: white;
  background: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 200px;
}

.submit-btn:hover {
  background: #0056b3;
}

/* 📌 Select Dropdown */
select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* 📌 Disabled & Readonly Inputs */
.form-input:disabled,
input[readonly] {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.readonly-input {
  background-color: #f8f9fa;
  color: #495057;
  border-color: #e9ecef;
}

.readonly-input:focus {
  border-color: #e9ecef;
  box-shadow: none;
}

/* 📌 Number Input Styling */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 📌 Date & Time Inputs */
input[type="date"].form-input,
input[type="time"].form-input {
  height: 48px;
  padding: 0 1rem;
}

/* 📌 Responsive Adjustments */
@media (max-width: 1400px) {
  .register-container {
    max-width: 95%;
    margin: 1.5rem auto;
    padding: 2.5rem 3rem;
  }
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .register-container {
    margin: 1rem;
    padding: 1.5rem;
    min-height: auto;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-group {
    height: 75px;
    margin-bottom: 0.5rem;
  }

  .submit-btn {
    width: 100%;
  }
}

/* 📌 Table & List Styles */
.registration-list-section {
  margin-bottom: 2rem;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-box {
  width: 300px;
}

.table-wrapper {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 2rem;
}

/* 📌 Tables */
.registrations-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.registrations-table th {
  background: #f8f9fa;
  padding: 1.2rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
}

.registrations-table td {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #eee;
  color: #444;
}

.registrations-table tr:hover {
  background-color: #f8f9fa;
}

.registrations-table tr:last-child td {
  border-bottom: none;
}

/* 📌 Action Buttons */
.select-btn,
.change-btn {
  padding: 0.6rem 1.2rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.select-btn {
  background: #007bff;
}

.select-btn:hover {
  background: #0056b3;
}

.change-btn {
  background: #6c757d;
}

.change-btn:hover {
  background: #5a6268;
}

/* 📌 Errors & Loading States */
.error {
  color: red;
  margin-bottom: 10px;
}

.loading {
  color: #666;
  margin-bottom: 10px;
}

.debug-info {
  background: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

/* 📌 Submit Button */
.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* 📌 Fix Dropdown Styles */
.room-dropdown {
  width: 100%;
  height: 48px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  appearance: none; /* Removes default browser styling */
  transition: border-color 0.3s ease;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em;
}

/* 📌 Hover & Focus Effects */
.room-dropdown:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* 📌 Disabled State */
.room-dropdown:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* 📌 Mobile Optimization */
@media (max-width: 768px) {
  .room-dropdown {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
