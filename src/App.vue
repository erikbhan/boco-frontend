<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "./components/NavigationComponents/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
});
</script>

<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
