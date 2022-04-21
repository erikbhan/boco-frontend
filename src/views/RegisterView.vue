<template>
  <register-form-component id="form" />
</template>

<script>
import RegisterFormComponent from "../components/RegisterFormComponent.vue";

export default {
  components: {
    RegisterFormComponent,
  },
};
</script>

<style scoped>
#form {
  max-width: 80%;
  margin: auto;
  margin-top: 5%;
}
</style>
