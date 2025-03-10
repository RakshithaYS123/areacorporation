// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are loaded

// const app = createApp(App);

// app.use(router);
// app.use(store);

// app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

createApp(App).use(store).use(router).mount("#app");
