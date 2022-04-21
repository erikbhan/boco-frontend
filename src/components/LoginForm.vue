<template>
  <div class="loginForm">
    <v-img :src="require('../assets/logo3.svg')" class="image" contain />
    <form @submit.prevent="onSubmit">
      <!--
      <div class="inputFields">
        <br><label class="label">E-post</label><br>
        <input class="loginInputs" type="text" v-model="v$.user.email.$model" />

        <br><label class="label"><br>Passord</label><br>
        <input class="loginInputs" type="password" v-model="v$.user.password.$model" />
        <br><a href="url" id="forgottenPasswordLink">Glemt passord</a>
      </div>


      <br><br>
      <div class="buttonLink">
        <button class="loginButton" type="submit" @click="loginClicked">LOGG INN</button>
        <br><a id="newUserLink" href="url">Ny bruker</a>
        <p id="messageUser">{{ message }}</p>
      </div> -->

      <div class="inputFields">
        <div :class="{ error: v$.user.email.$errors.length }">
          <br /><label class="label" id="emailLabelId">E-post </label><br />
          <input
            class="loginInputs"
            type="email"
            v-model="v$.user.email.$model"
          />

          <!-- error message -->
          <div
            class="input-errors"
            v-for="(error, index) of v$.user.email.$errors"
            :key="index"
          >
            <div class="error-msg" v-show="showError" id="emailErrorId">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <!-- password -->
        <div :class="{ error: v$.user.password.$errors.length }">
          <br /><label class="label" id="passwordLabelId">Passord </label><br />
          <input
            class="loginInputs"
            type="password"
            v-model="v$.user.password.$model"
          />

          <!-- error message -->
          <div
            class="input-errors"
            v-for="(error, index) of v$.user.password.$errors"
            :key="index"
          >
            <div class="error-msg" v-show="showError" id="passwordErrorId">
              {{ error.$message }}
            </div>
          </div>

          <!-- Link to forgot password page will be added here -->
          <br /><a href="url" id="forgottenPasswordLink">Glemt passord</a>
        </div>
      </div>

      <div class="buttonLink">
        <!-- Submit Button -->
        <div class="buttons-w">
          <br /><br /><button v-on:click="loginClicked" class="loginButton">
            Logg inn
          </button>

          <!-- Link to register new user page will be added here -->
          <br /><a id="newUserLink" href="url">Ny bruker</a>

          <p id="messageUser">{{ message }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { doLogin } from "@/utils/apiutil";

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
    /**loginClicked: function (){
      this.showError = true;
      console.log(this.user.email + " " + this.user.password);
    },*/

    async loginClicked() {
      //alert("You entered, username: " + this.username);
      const loginRequest = {
        email: this.user.email,
        password: this.user.password,
      };
      const loginResponse = await doLogin(loginRequest);
      console.log(loginResponse);
    },
  },
};
</script>

<style scoped>
.loginForm {
  background-color: white;
  border-radius: 10px;
  margin: auto;
  width: 80%;
  margin-top: 20%;
  justify-content: center;
  padding: 10px;
  font-size: 18px;
}
.label {
  float: left;
  margin-left: 5%;
}
.loginInputs {
  background-color: #c4c4c4;
  border-radius: 5px;
  width: 90%;
  height: 40px;
  padding: 5px;
}
.loginButton {
  width: 55%;
  height: 50px;
  background-color: #1071b8;
  color: white;
  border-radius: 10px;
  justify-content: center;
  text-align: center;
  margin: auto;
  font-size: 25px;
  margin-bottom: 20px;
}
.loginButton:disabled {
  opacity: 50%;
  cursor: not-allowed;
}
.buttonLink {
  margin: auto;
  text-align: center;
  margin-bottom: 40px;
}
.image {
  width: 45%;
  margin: auto;
  margin-top: 20px;
}
#forgottenPasswordLink {
  float: right;
  margin: 10px 5% 0 0;
}

#newUserLink {
  text-decoration: none;
  margin-bottom: 40px;
}
.inputFields {
  margin: auto;
  text-align: center;
}

.input-errors {
  color: red;
}
</style>
