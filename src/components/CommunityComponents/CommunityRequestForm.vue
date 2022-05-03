<template>
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full p-4"
  >
    <!-- Component heading -->
    <div
      class="text-xl md:text-2xl font-medium text-center text-gray-600 dark:text-gray-200 mt-4 mb-10"
    >
      Bli med i: {{gruppenavn}}
    </div>


    <!-- Description -->
    <div class="mt-6" :class="{ error: v$.group.description.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="descriptionLabel"
        > Melding til administrator av gruppa: </label
      >
      <textarea
        id="description"
        rows="4"
        v-model="v$.group.description.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        required
      ></textarea>

      <!-- error message for description -->
      <div
        class="text-error"
        v-for="(error, index) of v$.group.description.$errors"
        :key="index"
      >
        <div class="text-error text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Save item button -->
    <div class="flex justify-center mt-10 float-right">
      <Button @click="saveClicked" id="saveButton" :text="'Send'"> </Button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
import Button from "@/components/BaseComponents/ColoredButton";

export default {
  name: "CommunityRequestForm.vue",

  components: {
    Button,
  },
  setup() {
    return { v$: useVuelidate() };
  },

  validations() {
    return {
      group: {
        description: {
          required: helpers.withMessage(
            () => "Meldingen kan ikke være tom",
            required
          ),
          max: helpers.withMessage(
            () => `Meldingen kan inneholde max 200 tegn`,
            maxLength(200)
          ),
        },
      },
    };
  },
  data() {
    return {
      group: {
        description: "",
        communityId: null,
      },
    };
  },
  computed: {
  },
  methods: {

    async saveClicked() {
      await axios.post(process.env.VUE_APP_BASEURL+ `community/${this.communityId}/private/join`);
    },
  },
};
</script>
