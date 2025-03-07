import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: !!localStorage.getItem("token"), // ✅ Load token from localStorage
    email: "",
    password: "",
    errorMessage: "",
  }),
  actions: {
    setAuthenticated(status) {
      this.isAuthenticated = status;
    },
  },
});
