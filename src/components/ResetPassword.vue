<template>
  <div class="resetPassword">
    <v-img :src="require('../assets/logo3.svg')" class="image" contain />
    <form class="resetPasswordForm">
      <label class="label" id="emailLabelId"> Skriv inn E-posten din </label>
      <input type="email" name="email" v-model="email" class="input" />
      <button class="resetPasswordButton" id="newPassword">Send inn</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ResetPassword.vue",
  data() {
    return {
      email: "",
    };
  },
};
</script>
