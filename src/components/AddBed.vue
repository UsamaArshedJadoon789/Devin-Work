<template>
  <div class="register-container">
    <h2 class="title">Add Bed</h2>
    <form @submit.prevent="addBed" class="register-form">
      <div class="form-section">
        <div class="form-group">
          <input v-model="number" type="text" required class="form-input" />
          <label class="floating-label">Bed Number</label>
        </div>
        <div class="form-group">
          <select v-model="hallId" required class="form-input" @change="fetchFloorsByHall">
            <option value="" disabled>Select Hall</option>
            <option v-for="hall in halls" :key="hall._id" :value="hall._id">
              {{ hall.name }}
            </option>
          </select>
          <label class="floating-label">Hall</label>
        </div>
        <div class="form-group">
          <select v-model="floorId" required class="form-input" :disabled="!hallId" @change="fetchRoomsByFloor">
            <option value="" disabled>Select Floor</option>
            <option v-for="floor in floors" :key="floor._id" :value="floor._id">
              {{ floor.name }}
            </option>
          </select>
          <label class="floating-label">Floor</label>
        </div>
        <div class="form-group">
          <select v-model="roomId" required class="form-input" :disabled="!floorId">
            <option value="" disabled>Select Room</option>
            <option v-for="room in rooms" :key="room._id" :value="room._id">
              {{ room.number }}
            </option>
          </select>
          <label class="floating-label">Room</label>
        </div>
        <div class="form-group">
          <select v-model="status" required class="form-input">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
          <label class="floating-label">Status</label>
        </div>
      </div>
      <div class="navigation-buttons">
        <button type="submit" class="nav-btn submit-btn">Add Bed</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      number: "",
      hallId: "",
      floorId: "",
      roomId: "",
      status: "available",
      halls: [],
      floors: [],
      rooms: []
    };
  },
  mounted() {
    this.fetchHalls();
  },
  methods: {
    async fetchHalls() {
      try {
        const response = await axios.get("http://localhost:5000/api/halls");
        this.halls = response.data;
      } catch (error) {
        console.error("Error fetching halls:", error);
        alert("Error fetching halls. Please check console for details.");
      }
    },
    async fetchFloorsByHall() {
      if (!this.hallId) return;
      
      try {
        const response = await axios.get(`http://localhost:5000/api/floors/hall/${this.hallId}`);
        this.floors = response.data;
        this.floorId = ""; // Reset floor selection
        this.roomId = ""; // Reset room selection
        this.rooms = []; // Clear rooms
      } catch (error) {
        console.error("Error fetching floors:", error);
        alert("Error fetching floors. Please check console for details.");
      }
    },
    async fetchRoomsByFloor() {
      if (!this.floorId) return;
      
      try {
        // Get floor name
        const floor = this.floors.find(f => f._id === this.floorId)?.name || "";
        // Get hall name
        const hall = this.halls.find(h => h._id === this.hallId)?.name || "";
        
        // Fetch rooms by hall and floor
        const response = await axios.get("http://localhost:5000/api/rooms");
        this.rooms = response.data.filter(room => 
          room.hall === hall && room.floor === floor
        );
        this.roomId = ""; // Reset room selection
      } catch (error) {
        console.error("Error fetching rooms:", error);
        alert("Error fetching rooms. Please check console for details.");
      }
    },
    async addBed() {
      try {
        const response = await axios.post("http://localhost:5000/api/beds/add", {
          number: this.number,
          roomId: this.roomId,
          status: this.status
        });
        alert("Bed added successfully!");
        this.resetForm();
      } catch (error) {
        console.error("Error adding bed:", error);
        alert("Error adding bed. Please check console for details.");
      }
    },
    resetForm() {
      this.number = "";
      this.hallId = "";
      this.floorId = "";
      this.roomId = "";
      this.status = "available";
      this.floors = [];
      this.rooms = [];
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 600px;
  width: 100%;
  margin: 2rem auto;
  padding: 2.5rem 2.5rem 2.5rem 4rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 4rem);
}

.title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.form-group {
  position: relative;
  margin-top: 1rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.floating-label {
  position: absolute;
  left: 10px;
  top: -10px;
  font-size: 0.85rem;
  color: #555;
  background: white;
  padding: 0 5px;
  z-index: 1;
}

.navigation-buttons {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-btn {
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-width: 100px;
}

.submit-btn {
  background: #28a745;
  color: white;
}
</style>
