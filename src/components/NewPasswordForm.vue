<template>
  <div>
    <v-col align="center" justify="space-around" class="mt-16">
      <v-img
        max-width="45%"
        :src="require('../assets/logo3.svg')"
        align="center"
      />
    </v-col>

    <v-form ref="form" v-model="valid" lazy-validation class="mt-8">
      <v-text-field
        v-model="user.password"
        :rules="[rules.required, rules.min]"
        :type="'password'"
        name="input-10-1"
        label="Passord"
        counter
      ></v-text-field>

      <v-text-field
        v-model="user.rePassword"
        :rules="[rules.required, rules.min, rules.passwordConfirmation]"
        :type="'password'"
        name="input-10-1"
        label="Confirm Password"
        counter
      ></v-text-field>

      <v-col justify="space-around" align="center">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mb-4 mt-4"
          width="50%"
          height="40px"
          @click="setNewPassword"
        >
          Endre passord
        </v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "NewPasswordForm.vue",

  data() {
    return {
      user: {
        password: "",
        rePassword: "",
      },

      valid: true,
      rules: {
        required: (value) => !!value || "Feltet er påkrevd",
        min: (v) => v.length >= 8 || "Minimum 8 tegn",
        passwordConfirmation: (v) =>
          v === this.user.password || "Passordene må være like",
      },
    };
  },

  methods: {
    async setNewPassword() {},
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
