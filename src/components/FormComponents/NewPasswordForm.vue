<template>
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full p-4"
  >
    <h3
      class="text-xl font-medium text-center text-gray-600 dark:text-gray-200 mt-4 mb-8"
    >
      Endre passord
    </h3>

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
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
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
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
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
      <Button
        class="float-right"
        @click="setNewPassword"
        :text="'Sett ny passord'"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { doNewPassword } from "@/utils/apiutil";
import { mapState } from "vuex";
import Button from "@/components/BaseComponents/ColoredButton";

export default {
  name: "NewPasswordForm.vue",

  components: {
    Button,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      user: {
        password: {
          required: helpers.withMessage(`Feltet må være utfylt`, required),
          minLength: helpers.withMessage(
            "Passordet må være minst 8 karakterer lang",
            minLength(8)
          ),
        },
        rePassword: {
          sameAs: helpers.withMessage(
            "Passordene må være like",
            sameAs(this.user.password)
          ),
          required: helpers.withMessage(`Feltet må være utfylt`, required),
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
        //console.log("Invalid, exiting...");
        return;
      }

      const newPassword = this.user.password;

      const newPasswordResponse = await doNewPassword(newPassword);

      if (newPasswordResponse != null) {
        console.log("New password set");
        this.$store.commit("saveToken", newPasswordResponse);
        await this.$router.push("/");
      } else {
        console.log("Couldn't set new password");
      }

      /*

      if (newPasswordResponse.newPasswordSet === true) {
        //console.log("New password set");
        await this.$router.push("/");
      } else if (newPasswordResponse.newPasswordSet === false) {
        //console.log("Couldn't set new password");
      } else {
        //console.log("Something went wrong");
      }

      */
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
