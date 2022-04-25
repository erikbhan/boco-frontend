<template>
  <div class="m-6" :class="{ error: v$.user.email.$errors.length }">
    <div class="mb-6">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >E-post</label
      >
      <input
        type="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="eksempel@eksempel.com"
        v-model="v$.user.email.$model"
        required
      />

      <!-- error message -->
      <div v-for="(error, index) of v$.user.email.$errors" :key="index">
        <div class="text-red-600 text-sm" v-show="showError" id="emailErrorId">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-6" :class="{ error: v$.user.password.$errors.length }">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Passord</label
      >
      <input
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="v$.user.password.$model"
        required
      />

      <!-- error message -->
      <div
        class="text-red"
        v-for="(error, index) of v$.user.password.$errors"
        :key="index"
      >
        <div
          class="text-red-600 text-sm"
          v-show="showError"
          id="passwordErrorId"
        >
          {{ error.$message }}
        </div>
      </div>

      <div class="align-items: flex-end; mb-6">
        <div class="ml-3 text-sm">
          <a href="/" class="text-blue-600">Glemt passord</a>
        </div>
      </div>
    </div>

    <button
      @click="loginClicked"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Logg inn
    </button>
  </div>

  <div>
    <label>{{ response }}</label>
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

      response: '',

      showPassword: false,
      valid: true,
      showError: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 0 || "Min 8 characters",
      },
    };
  },

  methods: {
    async loginClicked() {
      console.log(this.user.email + " " + this.user.password);
      this.showError = true;

      this.v$.user.email.$touch();
      if (this.v$.user.email.$invalid) {
        console.log("Invalid, avslutter...");
        return;
      }

      console.log("videre!");

      const loginRequest = {
        email: this.user.email,
        password: this.user.password,
      };

      console.log("før");

      console.log("env: " + process.env.VUE_APP_BASEURL);

      const loginResponse = await doLogin(loginRequest);


      console.log("respons" + loginResponse);

      this.response = loginResponse.data;

      if (loginResponse === "Failed login") {
        this.message = "kunne ikke logge inn";
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
