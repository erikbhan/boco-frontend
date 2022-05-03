import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ws from "./services/ws";

createApp(App).use(router).use(store).mount("#app");
//console.log("WS", ws.test);
