<template>
  <div class="m-6">
    <!-- Component heading -->
    <div class="flex justify-center">
      <p class="text-4xl mb-6 mt-6">Utleie</p>
    </div>

    <!-- Title -->
    <div class="mb-6" :class="{ error: v$.item.title.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="addressLabel"
        >Tittel</label
      >
      <input
        type="text"
        id="title"
        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="v$.item.title.$model"
        required
      />

      <!-- error message for title-->
      <div
        class="text-red"
        v-for="(error, index) of v$.item.title.$errors"
        :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Select category -->
    <div class="mb-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="selectCategoryLabel"
        >Kategori</label
      >
      <select
        v-model="v$.item.select.$model"
        id="categories"
        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option class="text-gray-400" value="" disabled selected>
          Select a category
        </option>
        <option
          v-for="category in categories"
          :key="category"
          class="text-gray-900 text-sm"
        >
          {{ category }}
        </option>
      </select>

      <!-- error message for select box -->
      <div
        class="text-red"
        v-for="(error, index) of v$.item.select.$errors"
        :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- price -->
    <div class="mb-6" :class="{ error: v$.item.price.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="priceLabel"
        >Pris</label
      >
      <input
        type="number"
        v-model="v$.item.price.$model"
        id="price"
        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <!-- error message for price -->
      <div
        class="text-red"
        v-for="(error, index) of v$.item.price.$errors"
        :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="mb-6" :class="{ error: v$.item.description.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="descriptionLabel"
        >Beskrivelse</label
      >
      <textarea
        id="description"
        rows="4"
        v-model="v$.item.description.$model"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      ></textarea>

      <!-- error message for description -->
      <div
        class="text-red"
        v-for="(error, index) of v$.item.description.$errors"
        :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>


    <!-- Address -->
    <div class="mb-6" :class="{ error: v$.item.address.$errors.length }">
      <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          id="titleLabel"
      >Adresse</label>
      <input
          type="text"
          class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="v$.item.address.$model"
          id="adress"
          required
      />

      <!-- error message for address-->
      <div
          class="text-red"
          v-for="(error, index) of v$.item.address.$errors"
          :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>


    <!-- Images -->
    <div>
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="imageLabel"
      >
        Bilder
      </label>

      <input
        type="file"
        ref="file"
        style="display: none"
        @change="addImage"
        multiple
        accept="image/png, image/jpeg"
      />

      <button
        @click="$refs.file.click()"
        class="text-black bg-gray-200 hover:bg-grey-800 focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-grey-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800"
      >
        Velg bilde
      </button>

      <div v-for="image in item.images" :key="image" class="m-2">
        <img :src="image" class="w-2/5 inline" alt="Bilde av gjenstanden" />
      </div>
    </div>

    <!-- Save item button -->
    <div class="flex justify-center">
      <button
        @click="saveClicked"
        class="content-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        id="saveButton"
      >
        Lagre
      </button>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { parseUserFromToken } from "@/utils/token-utils";
import { postNewItem } from "@/utils/apiutil";

import {
  required,
  helpers,
  maxLength,
  between,
  minLength,
} from "@vuelidate/validators";
import router from "@/router";

export default {
  name: "AddNewItem",

  setup() {
    return { v$: useVuelidate() };
  },

  validations() {
    return {
      item: {
        title: {
          required: helpers.withMessage(
              () => "Tittelen kan ikke være tom",
              required
          ),
          max: helpers.withMessage(
            () => `Tittelen kan inneholde max 50 tegn`,
            maxLength(50)
          ),
        },
        description: {
          required: helpers.withMessage(
              () => "Beskrivelsen kan ikke være tom",
              required
          ),
          max: helpers.withMessage(
            () => `Beskrivelsen kan inneholde max 200 tegn`,
            maxLength(200)
          ),
          min: helpers.withMessage(
            () => `Beskrivelsen kan ikke være tom`,
            minLength(0)
          ),
        },
        price: {
          required,
          between: helpers.withMessage(
            () => `Leieprisen kan ikke være større enn 25000`,
            between(0, 25000)
          ),
        },
        select: {
          required: helpers.withMessage(() => `Velg en kategori`, required),
        },
        address: {
          required: helpers.withMessage(
              () => "Addressen kan ikke være tom",
              required
          ),
          max: helpers.withMessage(
              () => `Addressen kan inneholde max 50 tegn`,
              maxLength(50)
          ),
        },
      },
    };
  },

  data() {
    return {
      item: {
        title: "",
        description: "",
        address: "",
        price: "",
        category: "",
        select: null,
        type: "",
        images: [],
        userId: -1,
      },
      //Kategorier skal legges inn ved api/hente fra db, her må det endres etterhvert
      categories: ["Hage", "Kjøkken", "Musikk", "Annet"],
    };
  },
  methods: {
    checkValidation: function () {
      console.log("sjekker validering");

      this.v$.item.$touch();
      if (this.v$.item.$invalid) {
        console.log("Invalid, avslutter...");
        return false;
      }

      console.log("validert!");
      return true;
    },

    async saveClicked() {
      console.log("Attempting to save item");

      if (this.checkValidation()) {
        console.log("validert, videre...");

        this.checkUser();

        console.log("Tittel: " + this.item.title);
        console.log("Kategori: " + this.item.select);
        console.log("Beskrivelse: " + this.item.description);
        console.log("Addressen: " + this.item.address);
        console.log("Pris: " + this.item.price);
        console.log("bilder: " + this.item.images);

        const itemInfo = {
          title: this.item.title,
          description: this.item.description,
          pricePerDay: this.item.price,
          address: this.item.address,
          userID: this.item.userId,
          categoryNames: [],
          communityIDs: [],
        };

        console.log(itemInfo);

        const postRequest = await postNewItem(itemInfo);

        console.log("posted: " + postRequest);

      }
    },

    checkUser: async function (){
      let user = parseUserFromToken(this.$store.state.user.token);
      this.item.userId = parseInt(user.accountId);
      console.log("id: " + this.item.userId);
    },

    addImage: function (event) {
      console.log(event.target.files);
      this.item.images.push(URL.createObjectURL(event.target.files[0]));
      console.log("antall bilder: " + this.item.images.length);
    },
  },
  beforeMount() {
    console.log("Token: " + this.$store.state.user.token);
  }
};
</script>
