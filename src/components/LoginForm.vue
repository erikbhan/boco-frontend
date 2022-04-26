<template>
  <div class="App">
    <div id="logoField" class="flex justify-center m-6">
      <img src="../assets/logo3.svg" alt="BoCo logo" />
    </div>

    <div
      id="emailField"
      class="m-6"
      :class="{ error: v$.user.email.$errors.length }"
    >
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
          placeholder="eksempel@eksempel.no"
          v-model="v$.user.email.$model"
          required
        />
        <!-- error message -->
        <div v-for="(error, index) of v$.user.email.$errors" :key="index">
          <div
            class="text-red-600 text-sm"
            v-show="showError"
            id="emailErrorId"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>

    <div
      id="passwordField"
      class="m-6"
      :class="{ error: v$.user.password.$errors.length }"
    >
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
    </div>

    <div id="buttonsField" class="m-6">
      <div class="align-items: flex-end; mb-6">
        <div class="ml-3 text-sm">
          <router-link to="about" class="text-blue-600"
            >Glemt passord</router-link
          >
        </div>
      </div>
      <button
        @click="loginClicked"
        class="flex justify-center align-items: flex-end; text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Logg inn
      </button>
      <div class="flex justify-center align-items: flex-end; mb-6 mt-6">
        <div class="ml-3 text-sm">
          <router-link to="register" class="text-blue-600"
            >Ny bruker</router-link
          >
        </div>
      </div>
      <div class="flex flex-row min-h-screen justify-center items-center">
        <label>{{ message }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { doLogin } from "@/utils/apiutil";
import { parseUserFromToken } from "@/utils/token-utils";

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
        },
      },
    };
  },

  data() {
    return {
      message: "",
      user: {
        email: "",
        password: "",
      },

      showError: false,
    };
  },

  methods: {
    async loginClicked() {
      this.showError = true;

      this.v$.user.email.$touch();

      if (this.v$.user.email.$invalid) {
        console.log("Ugyldig, avslutter...");
        return;
      }

      const loginRequest = {
        email: this.user.email,
        password: this.user.password,
      };

      const loginResponse = await doLogin(loginRequest);

      if (loginResponse.data === "Login failed") {
        this.message = "Feil e-post/passord";
        this.$store.commit("logout");
      } else {
        this.$store.commit("saveToken", loginResponse);
      }

      let user = parseUserFromToken();
      let id = user.account_id;
      this.$router.push("/profile/" + id);
    },

    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
