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

<style scoped>
.resetPasswordForm {
  background-color: white;
  border-radius: 10px;
  margin: auto;
  width: 80%;
  justify-content: center;
  padding: 10px;
  font-size: 18px;
}
.label {
  margin-top: 20%;
  float: left;
}
.image {
  width: 45%;
  margin: auto;
  margin-top: 20px;
}
.input {
  background-color: #c4c4c4;
  border-radius: 5px;
  width: 90%;
  height: 40px;
  padding: 5px;
}
.resetPasswordButton {
  display: block;
  width: 55%;
  height: 50px;
  background-color: #1071b8;
  color: white;
  border-radius: 10px;
  justify-content: center;
  text-align: center;
  margin: auto;
  font-size: 25px;
  margin-bottom: 20px;
}

#newPassword {
  margin-top: 20px;
  font-size: 16px;
}
</style>
