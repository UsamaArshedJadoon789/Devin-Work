<template>
  <div class="register-container">
    <h2 class="title">Add Hall</h2>
    <form @submit.prevent="addHall" class="register-form">
      <div class="form-section">
        <div class="form-group">
          <input v-model="name" type="text" required class="form-input" />
          <label class="floating-label">Hall Name</label>
        </div>
        <div class="form-group">
          <textarea v-model="description" class="form-input textarea"></textarea>
          <label class="floating-label">Description</label>
        </div>
        <div class="form-group">
          <input v-model="capacity" type="number" required class="form-input" />
          <label class="floating-label">Capacity</label>
        </div>
      </div>
      <div class="navigation-buttons">
        <button type="submit" class="nav-btn submit-btn">Add Hall</button>
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
      description: "",
      capacity: 0
    };
  },
  methods: {
    async addHall() {
      try {
        const response = await axios.post("http://localhost:5000/api/halls/add", {
          name: this.name,
          description: this.description,
          capacity: this.capacity
        });
        alert("Hall added successfully!");
        this.resetForm();
      } catch (error) {
        console.error("Error adding hall:", error);
        alert("Error adding hall. Please check console for details.");
      }
    },
    resetForm() {
      this.name = "";
      this.description = "";
      this.capacity = 0;
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

.textarea {
  min-height: 100px;
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
