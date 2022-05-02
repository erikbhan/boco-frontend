<template>
  <div class="h-screen grid md:mt-8">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/FormComponents/LoginForm";
export default {
  name: "LoginView.vue",
  components: {
    LoginForm,
  },
};
</script>