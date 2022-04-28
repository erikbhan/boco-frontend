<template>
  <div class="h-screen bg-gray-200 content-center grid place-items-center">
    <RegisterFormComponent />
  </div>
</template>

<script>
import RegisterFormComponent from "../../components/FormComponents/RegisterForm.vue";

export default {
  components: {
    RegisterFormComponent,
  },
};
</script>
