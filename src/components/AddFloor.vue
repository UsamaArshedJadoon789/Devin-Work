<template>
  <div class="register-container">
    <h2 class="title">Add Floor</h2>
    <form @submit.prevent="addFloor" class="register-form">
      <div class="form-section">
        <div class="form-group">
          <input v-model="name" type="text" required class="form-input" />
          <label class="floating-label">Floor Name</label>
        </div>
        <div class="form-group">
          <select v-model="hallId" required class="form-input">
            <option value="" disabled>Select Hall</option>
            <option v-for="hall in halls" :key="hall._id" :value="hall._id">
              {{ hall.name }}
            </option>
          </select>
          <label class="floating-label">Hall</label>
        </div>
        <div class="form-group">
          <input v-model="level" type="number" required class="form-input" />
          <label class="floating-label">Level</label>
        </div>
      </div>
      <div class="navigation-buttons">
        <button type="submit" class="nav-btn submit-btn">Add Floor</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      hallId: "",
      level: 0,
      halls: []
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
    async addFloor() {
      try {
        const response = await axios.post("http://localhost:5000/api/floors/add", {
          name: this.name,
          hallId: this.hallId,
          level: this.level
        });
        alert("Floor added successfully!");
        this.resetForm();
      } catch (error) {
        console.error("Error adding floor:", error);
        alert("Error adding floor. Please check console for details.");
      }
    },
    resetForm() {
      this.name = "";
      this.hallId = "";
      this.level = 0;
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
