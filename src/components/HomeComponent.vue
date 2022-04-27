<template>
  <div class="flex justify-center">
    <router-link to="/login" class="m-6">Logg inn</router-link>

    <router-link to="/register" class="m-6">Registrer deg</router-link>

    <router-link to="/about" class="m-6">Om BoCo</router-link>

<div @click="logout" class="m-6 cursor-pointer"><p>Logout</p></div>

  </div>
</template>

<script>
export default {
  name: "Home",

  data: () => ({}),

  methods: {
    logout (){
      this.$store.commit("logout");
    },
  }
};
</script>
