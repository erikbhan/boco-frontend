<template>
  <section
    class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
  >
    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
      Opprett ny bruker
    </h2>

    <form @submit.prevent>
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-700 dark:text-gray-200" for="email"
            >E-mail</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label class="text-gray-700 dark:text-gray-200" for="password"
            >Passord</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label class="text-gray-700 dark:text-gray-200" for="confirmPassword"
            >Bekreft Passord</label
          >
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label class="text-gray-700 dark:text-gray-200" for="firstName"
            >Fornavn</label
          >
          <input
            data-test="firstNameTest"
            v-model="firstName"
            id="firstName"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label class="text-gray-700 dark:text-gray-200" for="lastName"
            >Etternavn</label
          >
          <input
            v-model="lastName"
            id="lastName"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label class="text-gray-700 dark:text-gray-200" for="address"
            >Addresse</label
          >
          <input
            v-model="address"
            id="address"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button
          class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          @click="submit()"
          type="submit"
          :disabled="loading"
        >
          <div v-if="loading">
            <div v-if="loading" class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div v-else>Lagre</div>
        </button>
      </div>
    </form>
  </section>
  <ul data-test="errorMessageList">
    <li v-if="errorMessage" data-test="customErrorMsg">{{ errorMessage }}</li>
    <li v-for="error of v$.$errors" :key="error.$uid">
      <!-- {{ error.$validator }} -->
      Field
      {{ error.$property }}
      has error:
      {{ error.$message }}
    </li>
  </ul>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { doLogin, registerUser } from "@/utils/apiutil";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

// const isEmailTaken = (value) =>
// fetch(`/api/unique/${value}`).then((r) => r.json()); // check the email in the server

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      errorMessage: "",
      loading: false,
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
        // isUnique: helpers.withAsync(isEmailTaken),
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: { sameAs: sameAs(this.password) },
      firstName: { required },
      lastName: { required },
      address: { required },
    };
  },
  methods: {
    async submit() {
      //Display loading symbol
      this.loading = true;

      //Validate form
      const result = await this.v$.$validate();
      if (!result) {
        this.loading = false;
        return;
      }

      //Send a request to create a user and save success as a bool
      const userCreated = await this.sendRegisterRequest();

      //If a user is created succsessfully, try to login
      //If we get this far, we will be pushed anyway so there is no point updating "loading"
      if (!userCreated) {
        this.errorMessage = "Could not create user.";
        return;
      }

      const loginRequest = {
        email: this.email,
        password: this.password,
      };

      const loginResponse = await doLogin(loginRequest);

      if (loginResponse.isLoggedIn === false) {
        this.errorMessage = "Failed to log in with new user";
        this.$store.commit("logout");
        await this.$router.push("/login");
        return;
      }

      this.$store.commit("saveToken", loginResponse.token);
      await this.$router.push("/");
    },
    async sendRegisterRequest() {
      const registerInfo = {
        email: this.email,
        firstName: this.firstName,
        lastname: this.lastName,
        password: this.password,
        address: this.address,
      };

      const response = await registerUser(registerInfo);

      if (response.status === 200) return true;
      return false;
    },
  },
};
</script>

<style scoped>
/* https://loading.io/css/ */
.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  margin: 2px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
