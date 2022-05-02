<template>
  <div
    class="w-full max-w-md m-auto md:ring-1 ring-gray-300 overflow-hidden rounded-xl mt-[3%] p-4"
  >
    <!-- Component heading -->
    <h3
      class="text-xl font-medium text-center text-gray-600 dark:text-gray-200 mt-4 mb-8"
    >
      Utleie
    </h3>

    <!-- Title -->
    <div class="mb-6" :class="{ error: v$.item.title.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="titleLabel"
        >Tittel</label
      >
      <input
        type="text"
        id="title"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        v-model="v$.item.title.$model"
        required
      />

      <!-- error message for title-->
      <div
        class="text-error"
        v-for="(error, index) of v$.item.title.$errors"
        :key="index"
      >
        <div class="text-error text-sm">
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
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
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
        class="text-error"
        v-for="(error, index) of v$.item.select.$errors"
        :key="index"
      >
        <div class="text-error text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Select Group -->
    <div class="mb-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Gruppe</label
      >
      <select
        v-model="v$.item.selectGroup.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
      >
        <option class="text-gray-400" value="" disabled selected>
          Select a Group
        </option>
        <option
          v-for="group in groups"
          :key="group"
          class="text-gray-900 text-sm"
        >
          {{ group }}
        </option>
      </select>

      <!-- error message for select box -->
      <div
        class="text-error"
        v-for="(error, index) of v$.item.selectGroup.$errors"
        :key="index"
      >
        <div class="text-error text-sm">
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
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        required
      />

      <!-- error message for price -->
      <div
        class="text-error"
        v-for="(error, index) of v$.item.price.$errors"
        :key="index"
      >
        <div class="text-error text-sm">
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
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        required
      ></textarea>

      <!-- error message for description -->
      <div
        class="text-error"
        v-for="(error, index) of v$.item.description.$errors"
        :key="index"
      >
        <div class="text-error text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Address -->
    <div class="mb-6" :class="{ error: v$.item.address.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Adresse</label
      >
      <input
        type="text"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        v-model="v$.item.address.$model"
        id="adress"
        required
      />

      <!-- error message for address-->
      <div
        class="text-error"
        v-for="(error, index) of v$.item.address.$errors"
        :key="index"
      >
        <div class="text-error text-sm">
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

      <Button :text="'Velg bilde'" @click="$refs.file.click()" />

      <div v-for="image in item.images" :key="image" class="m-2">
        <img :src="image" class="w-2/5 inline" alt="Bilde av gjenstanden" />
      </div>
    </div>

    <!-- Save item button -->
    <div class="flex justify-center">
      <Button :text="'Lagre'" @click="saveClicked" id="saveButton" />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { parseUserFromToken } from "@/utils/token-utils";
import { postNewItem } from "@/utils/apiutil";
import Button from "@/components/BaseComponents/ColoredButton";

import {
  required,
  helpers,
  maxLength,
  between,
  minLength,
} from "@vuelidate/validators";

export default {
  name: "AddNewItem",

  components: {
    Button,
  },

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
        selectGroup: {
          required: helpers.withMessage(() => `Velg en gruppe`, required),
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
        selectGroup: null,
      },
      //Kategorier skal legges inn ved api/hente fra db, her må det endres etterhvert
      categories: ["Hage", "Kjøkken", "Musikk", "Annet"],
      groups: [4040, 4041],
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
        console.log("gruppe: " + this.item.selectGroup);

        const itemInfo = {
          title: this.item.title,
          description: this.item.description,
          pricePerDay: this.item.price,
          address: this.item.address,
          userID: this.item.userId,
          categoryNames: [],
          communityIDs: [this.item.selectGroup],
        };

        console.log(itemInfo);

        const postRequest = await postNewItem(itemInfo);

        console.log("posted: " + postRequest);
      }
    },

    checkUser: async function () {
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
};
</script>
