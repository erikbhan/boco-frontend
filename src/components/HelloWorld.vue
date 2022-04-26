<template>
  <div class="flex justify-center">
    <router-link to="/login" class="m-6">Logg inn</router-link>

    <router-link to="/register" class="m-6">Registrer deg</router-link>

    <router-link to="/about" class="m-6">Om BoCo</router-link>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
};
</script>
