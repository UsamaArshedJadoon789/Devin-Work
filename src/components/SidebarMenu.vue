<template>
  <aside>
    <div class="logo-container">
      <img src="../assets/logo.png" alt="HMS Logo" class="logo">
      <h1>HMS</h1>
    </div>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/register">Register Resident</router-link>
    <router-link to="/allocate-room">Room Allocation</router-link>
    <router-link to="/reports">Generate Report</router-link>
    
    <!-- Resource Management -->
    <div class="menu-section">
      <h3>Resource Management</h3>
      <router-link to="/add-hall">Hall Management</router-link>
      <router-link to="/add-floor">Floor Management</router-link>
      <router-link to="/add-room">Room Management</router-link>
      <router-link to="/add-bed">Bed Management</router-link>
    </div>
    
    <!-- System Management -->
    <div class="menu-section">
      <h3>System Management</h3>
      <router-link to="/payments">Payment Management</router-link>
      <router-link to="/profile">Profile Management</router-link>
    </div>
    
    <a @click.prevent="handleSignOut" href="#" class="signout-link">Sign Out</a>
  </aside>
</template>

<script>
export default {
  methods: {
    async handleSignOut() {
      try {
        // Clear any authentication tokens/state
        localStorage.removeItem('token');
        
        // Force navigation to login page
        await this.$router.push('/login');
        
        // Reload the page to ensure clean state
        window.location.reload();
      } catch (error) {
        console.error('Sign out error:', error);
      }
    }
  }
}
</script>

<style>
aside {
  width: 250px;
  background: linear-gradient(180deg, #f5f7fa 0%, #e5e9f0 100%);
  padding: 20px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}
aside a {
  display: block;
  padding: 12px 15px;
  margin-bottom: 8px;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
aside a:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateX(5px);
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
aside a.router-link-active {
  background: linear-gradient(90deg, #219653 0%, #27ae60 100%);
  color: white;
  border: none;
}
.logo-container {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 0;
}
.logo-container img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}
.logo-container h1 {
  color: #219653;
  margin: 0;
  font-size: 24px;
}
:deep(.main-content) {
  margin-left: 250px;
  padding: 20px;
  min-height: 100vh;
}
.signout-link {
  margin-top: auto !important;
  background-color: #f8d7da !important;
  color: #721c24 !important;
  border: 1px solid #f5c6cb !important;
}
.signout-link:hover {
  background-color: #f1b0b7 !important;
}

.menu-section {
  margin: 20px 0;
}

.menu-section h3 {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 10px;
  padding-left: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}
</style>
