<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components

import NavBar from "./components/NavigationComponents/NavBar.vue";

export default defineComponent({
  name: "App",

  components: {
    NavBar,
  },
});
</script>
