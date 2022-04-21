<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="firstName"
      :counter="32"
      :rules="firstNameRules"
      label="Fornavn"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      :counter="32"
      :rules="lastNameRules"
      label="Etternavn"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="address"
      :counter="32"
      :rules="addressRules"
      label="Addresse"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :counter="32"
      :rules="passwordRules"
      label="Passord"
      :append-icon="passwordHidden ? 'mdi-eye' : 'mdi-eye-off'"
      :type="passwordHidden ? 'text' : 'password'"
      @click:append="passwordHidden = !passwordHidden"
      required
    ></v-text-field>

    <!-- <v-text-field
      v-model="confirmPassword"
      :rules="confirmPasswordRules"
      label="Bekreft passord"
      :append-icon="confirmPasswordHidden ? 'mdi-eye' : 'mdi-eye-off'"
      :type="confirmPasswordHidden ? 'text' : 'password'"
      @click:append="confirmPasswordHidden = !confirmPasswordHidden"
      required
    ></v-text-field> -->

    <!-- <v-select
      v-model="select"
      :items="items"
      :rules="[(v) => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->

    <!-- <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox> -->

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit"
      >Registrer</v-btn
    >

    <v-btn color="error" class="mr-4" @click="reset">Tøm alle felter</v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    passwordHidden: false,
    // confirmPasswordHidden: false,
    valid: true,
    firstName: "",
    firstNameRules: [
      (v) => !!v || "Fornavn er påkrevd",
      (v) => (v && v.length <= 32) || "Fornavn må være mindre enn 32 bokstaver",
    ],
    lastName: "",
    lastNameRules: [
      (v) => !!v || "Etternavn er påkrevd",
      (v) =>
        (v && v.length <= 32) || "Etternavn må være mindre enn 32 bokstaver",
    ],
    address: "",
    addressRules: [
      (v) => !!v || "Addresse er påkrevd",
      (v) =>
        (v && v.length <= 32) || "Addresse må være mindre enn 32 bokstaver",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Passord er påkrevd",
      (v) => (v && v.length <= 32) || "Passord må være mindre enn 32 bokstaver",
    ],
    // confirmPassword: "",
    // confirmPasswordRules: [
    //   (v) => !!v || "Passord er påkrevd",
    //   (v) => (v && v.length <= 32) || "Passord må være mindre enn 32 bokstaver",
    //   // (v) => v === this.password || "Passordene må være like",
    // ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    // select: null,
    // items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    // checkbox: false,
  }),

  methods: {
    submit() {
      // Validate form before using data
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
};
</script>
