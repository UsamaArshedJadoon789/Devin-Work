<template>
  <div class="app-container">
    <!-- Sidebar should only appear if authenticated -->
    <SidebarMenu v-if="isAuthenticated" class="sidebar" />
    
    <div class="main-content">
      <!-- Navbar should only appear if authenticated -->
      <NavbarPage v-if="isAuthenticated" class="navbar" />

      <!-- ✅ Ensure router-view always loads -->
      <div class="page-container">
        <router-view></router-view> 
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NavbarPage from "./components/NavbarPage.vue";
import SidebarMenu from "./components/SidebarMenu.vue";

export default {
  components: { NavbarPage, SidebarMenu },
  setup() {
    const isAuthenticated = ref(false);
    const router = useRouter();

    const checkAuth = () => {
      isAuthenticated.value = !!localStorage.getItem("token");
      if (!isAuthenticated.value && router.currentRoute.value.path !== "/login") {
        console.log("❌ Not logged in! Redirecting to Login...");
        router.push("/login"); // ✅ Redirect if NOT logged in
      }
    };

    onMounted(() => {
      checkAuth();
      window.addEventListener("storage", checkAuth);
    });

    return { isAuthenticated };
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 220px;
  background-color: #2c3e50;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

.main-content {
  flex-grow: 1;
  margin-left: 220px;
  width: calc(100% - 220px);
  height: 100vh;
  position: relative;
}

.navbar {
  height: 55px;
  background-color: #3498db;
  width: 100%;
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  z-index: 90;
}

.page-container {
  padding: 15px;
  margin-top: 55px;
  height: calc(100vh - 55px);
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
