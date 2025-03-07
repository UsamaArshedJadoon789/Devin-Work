import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import DashboardPage from "../components/DashboardPage.vue";
import RegisterResident from "../components/RegisterResident.vue";
import RoomAllocation from "../components/RoomAllocation.vue";
import ReportGeneration from "../components/ReportGeneration.vue";
import AddHall from "../components/AddHall.vue";
import AddFloor from "../components/AddFloor.vue";
import AddRoom from "../components/AddRoom.vue";
import AddBed from "../components/AddBed.vue";
import ProfileManagement from "../components/ProfileManagement.vue";
import PaymentManagement from "../components/PaymentManagement.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage, name: "Login" },
  { path: "/dashboard", component: DashboardPage, name: "Dashboard", meta: { requiresAuth: true } },
  { path: "/register", component: RegisterResident, meta: { requiresAuth: true } },
  { path: "/allocate-room", component: RoomAllocation, meta: { requiresAuth: true } },
  { path: "/reports", component: ReportGeneration, meta: { requiresAuth: true } },
  { path: "/add-hall", component: AddHall, meta: { requiresAuth: true } },
  { path: "/add-floor", component: AddFloor, meta: { requiresAuth: true } },
  { path: "/add-room", component: AddRoom, meta: { requiresAuth: true } },
  { path: "/add-bed", component: AddBed, meta: { requiresAuth: true } },
  { path: "/profile", component: ProfileManagement, meta: { requiresAuth: true } },
  { path: "/payments", component: PaymentManagement, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/login" }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ FORCE AUTH CHECK BEFORE NAVIGATING TO PROTECTED ROUTES
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    console.log("❌ Access Denied! Redirecting to Login...");
    return next("/login");  // ✅ Blocks unauthorized access
  }

  if (to.path === "/login" && token) {
    console.log("✅ Already Logged In! Redirecting to Dashboard...");
    return next("/dashboard"); // ✅ Prevent logged-in users from seeing the login page
  }

  next();
});

export default router;
