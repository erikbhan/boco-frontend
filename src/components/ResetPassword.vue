<template>
  <div class="resetPassword">
    <div
      id="emailField"
      class="m-6"
      :class="{ error: v$.email.$errors.length }"
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
          v-model="v$.email.$model"
          required
        />
        <!-- error message -->
        <div v-for="(error, index) of v$.email.$errors" :key="index">
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
    <button
      @click="sendHome"
      class="flex justify-center align-items: flex-end; text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Send e-post
    </button>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
export default {
  name: "ResetPassword.vue",

  data() {
    return {
      showError: false,
      email: "",
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      email: {
        required,
        email: helpers.withMessage(`E-posten er ugyldig`, email),
      },
    };
  },
  methods: {
    sendHome() {
      this.showError = true;

      this.v$.email.$touch();

      if (this.v$.email.$invalid) {
        console.log("Ugyldig, avslutter...");
        return;
      } else {
        this.$router.push("/");
      }
    },
  },
  validate() {
    this.$refs.form.validate();
  },
};
</script>
