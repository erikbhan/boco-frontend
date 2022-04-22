<template>
  <div class="resetPassword">
    <ResetPassword></ResetPassword>
  </div>
</template>

<script>
import ResetPassword from "@/components/ResetPassword";
export default {
  name: "ResetPasswordView.vue",
  components: {
    ResetPassword,
  },
};
</script>

<style scoped>
.resetPassword {
  background-color: white;
  height: 100%;
  overflow: auto;
}
</style>
