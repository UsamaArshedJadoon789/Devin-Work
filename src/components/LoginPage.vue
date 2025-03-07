<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Enter your password" required />
        </div>

        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const checkAuth = () => {
      if (localStorage.getItem("token")) {
        console.log("✅ Already Logged In! Redirecting to Dashboard...");
        router.push("/dashboard");  // ✅ Prevent login page access after login
      }
    };

    onMounted(() => {
      checkAuth();
    });

    const login = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: email.value,
          password: password.value,
        });

        localStorage.setItem("token", response.data.token);
        alert("✅ Login Successful!");

        window.dispatchEvent(new Event("storage"));
        router.push("/dashboard");  // ✅ Redirect to Dashboard after login

      } catch (error) {
        errorMessage.value = error.response?.data?.message || "Login failed!";
      }
    };

    return { email, password, login, errorMessage };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 1rem;
  color: #2e7d32;
}

.form-group {
  text-align: left;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #2e7d32;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #1b5e20;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>






