<template>
  <div>
    <v-col
        align="center"
        justify="space-around"
    >
        <v-img
            max-width="45%"
            :src="require('../assets/logo3.svg')"
            align="center"
        ></v-img>
      </v-col>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-col>
        <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>
      </v-col>


      <v-col
        align="right"
      >
        <v-text-field
            v-model="user.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="showPassword = !showPassword"
        ></v-text-field>

        <div class="text-decoration-underline mt-n4 mr-10">
          Glemt passord
        </div>
      </v-col>



      <v-col
          align="center"
          justify="space-around"
      >
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
          <a
              href="/"
              class="text-decoration-none"
          >Ny bruker</a>
        </div>
      </v-col>
    </v-form>
  </div>

</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { doLogin } from "@/utils/apiutil";
import { mapState } from "vuex";

export default {
  name: "LoginForm.vue",

  setup() {
    return { v$: useVuelidate() };
  },

  validations() {
    return {
      user: {
        email: {
          required,
          email: helpers.withMessage(`E-posten er ugyldig`, email),
        },
        password: {
          required,
          min: helpers.withMessage(
            ({ $params }) => `Passordet må inneholde minst ${$params.min} tegn`,
            minLength(8)
          ),
        },
      },
    };
  },

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
      valid : true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    };
  },

  methods: {
    async loginClicked() {
      console.log(this.user.email + " " + this.user.password);
      this.showError = true;
      const loginRequest = {
        email: this.user.email,
        password: this.user.password,
      };
      const loginResponse = await doLogin(loginRequest);

      if (loginResponse === "Failed login") {
        this.message = "kunne ikke logge inn";
        this.$store.commit('logout');
        return;
      }

      this.$store.commit("saveToken", loginResponse);
      console.log(loginResponse);
    },


    validate () {
      this.$refs.form.validate()
    },
  },
};
</script>
