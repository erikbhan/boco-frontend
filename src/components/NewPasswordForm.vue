<template>
  <div
    class="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-8"
  >
    <div
      id="firstPasswordField"
      :class="{ error: v$.user.password.$errors.length }"
    >
      <label
        for="password"
        class="block text-sm text-gray-800 dark:text-gray-200"
        >Nytt passord</label
      >
      <input
        type="password"
        v-model="v$.user.password.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
      <!-- error message -->
      <div v-for="(error, index) of v$.user.password.$errors" :key="index">
        <div
          class="text-red-600 text-sm"
          v-show="showError"
          id="passwordErrorId"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div
      id="secondPasswordField"
      class="mt-4"
      :class="{ error: v$.user.rePassword.$errors.length }"
    >
      <div class="flex items-center justify-between">
        <label
          for="rePassword"
          class="block text-sm text-gray-800 dark:text-gray-200"
          >Gjenta nytt passord</label
        >
      </div>

      <input
        type="password"
        v-model="v$.user.rePassword.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
      <!-- error message -->
      <div v-for="(error, index) of v$.user.rePassword.$errors" :key="index">
        <div
          class="text-red-600 text-sm"
          v-show="showError"
          id="rePasswordErrorId"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div id="buttonsField" class="mt-6">
      <button
        @click="setNewPassword"
        class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      >
        Endre passord
      </button>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { doNewPassword } from "@/utils/apiutil";
import { mapState } from "vuex";

export default {
  name: "NewPasswordForm.vue",

  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      user: {
        password: {
          required,
          minLength: minLength(8),
        },
        rePassword: {
          required,
          minLength: minLength(8),
          sameAs: sameAs(this.user.password),
        },
      },
    };
  },
  data() {
    return {
      user: {
        password: "",
        rePassword: "",
      },

      showError: false,
    };
  },
  computed: mapState({
    token: (state) => state.user.token,
  }),
  methods: {
    async setNewPassword() {
      this.showError = true;

      this.v$.user.$touch();

      if (this.v$.user.$invalid) {
        console.log("Invalid, exiting...");
        return;
      }

      const newPasswordInfo = {
        token: this.token,
        newPassword: this.password,
      };

      const newPasswordResponse = doNewPassword(newPasswordInfo);

      if (newPasswordResponse.newPasswordSet === true) {
        console.log("New password set");
        await this.$router.push("/endre");
      } else if (newPasswordResponse.newPasswordSet === false) {
        console.log("Couldn't set new password");
      } else {
        console.log("Something went wrong");
      }
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
