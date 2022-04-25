<!--suppress HtmlDeprecatedAttribute -->
<template>
  <div>
    <v-col align="center" justify="space-around" class="mt-16">
      <v-img
        max-width="45%"
        :src="require('../assets/logo3.svg')"
        align="center"
      ></v-img>
    </v-col>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-col>
        <v-text-field
          v-model="user.email"
          :rules="[rules.email]"
          label="Epost"
          required
        ></v-text-field>
      </v-col>

      <v-col align="right">
        <v-text-field
          v-model="user.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-1"
          label="Passord"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <div class="text-decoration-underline mt-n4 mr-10">Glemt passord</div>
      </v-col>

      <v-col align="center" justify="space-around">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mb-4 mt-4"
          width="50%"
          height="40px"
          @click="loginClicked"
        >
          Logg inn
        </v-btn>

        <div>
          <a href="/" class="text-decoration-none">Ny bruker</a>
        </div>
      </v-col>
    </v-form>
    <label>{{ message }}</label>
  </div>
</template>

<script>
import { doLogin } from "@/utils/apiutil";
import { mapState } from "vuex";

export default {
  name: "LoginForm.vue",

  computed: mapState({
    token: (state) => state.user.token,
  }),

  data() {
    return {
      message: "",
      user: {
        email: "",
        password: "",
      },

      showPassword: false,
      valid: true,
      rules: {
        required: (value) => !!value || "Feltet er påkrevd",
        min: (v) => v.length >= 8 || "Minimum 8 tegn",
        email: (v) => /.+@.+\..+/.test(v) || "Epost adressen må være gyldig",
      },
    };
  },

  methods: {
    async loginClicked() {
      console.log(this.user.email + " " + this.user.password);
      const loginRequest = {
        email: this.user.email,
        password: this.user.password,
      };
      const loginResponse = await doLogin(loginRequest);

      if (loginResponse === "Failed login") {
        this.message = "Feil brukernavn/passord";
        this.$store.commit("logout");
        return;
      }

      this.$store.commit("saveToken", loginResponse);
      console.log(loginResponse);
    },

    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
