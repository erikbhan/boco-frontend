<template>
  <div class="newPasswordPage">
    <NewPasswordForm></NewPasswordForm>
  </div>
</template>

<script>
import NewPasswordForm from "@/components/NewPasswordForm";
export default {
  name: "NewPasswordView.vue",
  components: {
    NewPasswordForm,
  },
};
</script>

<style scoped>
.newPasswordPage {
  background-color: white;
  height: 100%;
  overflow: auto;
}
</style>
