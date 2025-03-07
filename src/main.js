import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // ✅ Ensure this is imported

const app = createApp(App);
app.use(router); // ✅ Ensure Vue uses Router
app.mount("#app");
