<template>
  <div class="loginPage">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  name: "LoginView.vue",
  components: {
    LoginForm,
  }
}
</script>

<style scoped>

.loginPage{

  background-color: white;
  height: 100%;
  overflow: auto;
}
</style>
