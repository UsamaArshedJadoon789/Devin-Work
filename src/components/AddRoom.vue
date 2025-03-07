<template>
  <div class="register-container">
    <h2 class="title">Add Room</h2>
    <form @submit.prevent="addRoom" class="register-form">
      <div class="form-section">
        <div class="form-group">
          <input v-model="number" type="text" required class="form-input" />
          <label class="floating-label">Room Number</label>
        </div>
        <div class="form-group">
          <select v-model="type" required class="form-input">
            <option value="" disabled>Select Type</option>
            <option value="Guest">Guest</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Staff">Staff</option>
          </select>
          <label class="floating-label">Type</label>
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
          <select v-model="floorId" required class="form-input" :disabled="!hallId">
            <option value="" disabled>Select Floor</option>
            <option v-for="floor in floors" :key="floor._id" :value="floor._id">
              {{ floor.name }}
            </option>
          </select>
          <label class="floating-label">Floor</label>
        </div>
        <div class="form-group">
          <input v-model="price" type="number" required class="form-input" />
          <label class="floating-label">Price (PKR)</label>
        </div>
      </div>
      <div class="navigation-buttons">
        <button type="submit" class="nav-btn submit-btn">Add Room</button>
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
      type: "",
      hallId: "",
      floorId: "",
      price: 0,
      halls: [],
      floors: []
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
      } catch (error) {
        console.error("Error fetching floors:", error);
        alert("Error fetching floors. Please check console for details.");
      }
    },
    async addRoom() {
      try {
        // Get hall and floor names
        const hall = this.halls.find(h => h._id === this.hallId)?.name || "";
        const floor = this.floors.find(f => f._id === this.floorId)?.name || "";
        
        const response = await axios.post("http://localhost:5000/api/rooms/add", {
          number: this.number,
          type: this.type,
          hall: hall,
          floor: floor,
          price: this.price,
          status: "available"
        });
        alert("Room added successfully!");
        this.resetForm();
      } catch (error) {
        console.error("Error adding room:", error);
        alert("Error adding room. Please check console for details.");
      }
    },
    resetForm() {
      this.number = "";
      this.type = "";
      this.hallId = "";
      this.floorId = "";
      this.price = 0;
      this.floors = [];
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
