<template>
  <register-form-component id="form" class="pa-8" />
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
  max-width: 600px;
  margin: auto;
}
</style>
