<template>
  <div
    class="w-full max-w-md m-auto md:ring-1 ring-gray-300 overflow-hidden rounded-xl mt-[10%] p-4"
  >
    <h3 class="text-xl font-medium text-center text-gray-600 dark:text-gray-200 mt-4 mb-8">Opprett ny bruker</h3>

    <form @submit.prevent>
      <div class="grid grid-cols-1 gap-6 mt-4">
        <div >
          <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                 v-model="email"
                 id="email"
            type="email"
            placeholder="E-post adresse"
         />
        </div>

        <div class="w-full">
          <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                 v-model="password"
                 id="password"
            type="password"
            placeholder="Passord"
            />
        </div>

        <div>
          <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                 v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Bekreft passord"
            />
        </div>

        <div>
          <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                 data-test="firstNameTest"
            v-model="firstName"
            id="firstName"
            type="text"
            placeholder="Fornavn"
            />
        </div>

        <div>
          <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                 v-model="lastName"
            id="lastName"
            type="text"
            placeholder="Etternavn"
            />
        </div>

        <div>
          <input class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                 v-model="address"
            id="address"
            type="text"
            placeholder="Adresse"
            />
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <Button @click="submit" :text="'Lagre'"></Button>
      </div>
    </form>
  </div>
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
import Button from "@/components/BaseComponents/ColoredButton"

// const isEmailTaken = (value) =>
// fetch(`/api/unique/${value}`).then((r) => r.json()); // check the email in the server

export default {
  components: {
    Button,
  },
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

      return response.status === 200;

    },
  },
};
</script>
