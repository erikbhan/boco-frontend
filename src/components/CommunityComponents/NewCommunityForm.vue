<template>
  <div class="m-6">
    <!-- Component heading -->
    <div class="flex justify-center mt-6">
      <p class="text-4xl">Opprett Gruppe</p>
    </div>

    <!-- Radio boxes -->
    <div class="mt-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="radioBoxLabel"
        >Synlighet</label
      >
      <div class="form-check">
        <input
          class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioOpen"
          value="Åpen"
          @change="checkRadioButton($event)"
          checked
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="flexRadioOpen"
          id="radioBoxOpenLabel"
        >
          Åpen
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioPrivate"
          value="Privat"
          @change="checkRadioButton($event)"
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="flexRadioPrivate"
          id="radioBoxPrivateLabel"
        >
          Privat
        </label>
      </div>
    </div>

    <!-- Title -->
    <div class="mt-6" :class="{ error: v$.group.name.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="titleLabel"
        >Gruppenavn</label
      >
      <input
        type="text"
        id="title"
        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="v$.group.name.$model"
        required
      />

      <!-- error message for title-->
      <div
        class="text-red"
        v-for="(error, index) of v$.group.name.$errors"
        :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Place -->
    <div class="mt-6" :class="{ error: v$.group.place.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >By/Sted</label
      >
      <input
        type="text"
        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="v$.group.place.$model"
        required
      />

      <!-- error message for place-->
      <div
        class="text-red"
        v-for="(error, index) of v$.group.place.$errors"
        :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Select category
    <div class="mt-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="selectCategoryLabel"
        >Kategori</label
      >
      <select
        v-model="v$.group.select.$model"
        id="categories"
        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option class="text-gray-400" value="" disabled selected>
          Select a category
        </option>
        <option
          v-for="category in group.categories"
          :key="category"
          class="text-gray-900 text-sm"
        >
          {{ category }}
        </option>
      </select>

      error message for select box
      <div
        class="text-red"
        v-for="(error, index) of v$.group.select.$errors"
        :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div> -->

    <!-- Description -->
    <div class="mt-6" :class="{ error: v$.group.description.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="descriptionLabel"
        >Beskrivelse</label
      >
      <textarea
        id="description"
        rows="4"
        v-model="v$.group.description.$model"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      ></textarea>

      <!-- error message for description -->
      <div
        class="text-red"
        v-for="(error, index) of v$.group.description.$errors"
        :key="index"
      >
        <div class="text-red-600 text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Images -->
    <div class="mt-6">
      <label
        class="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400"
        id="imageLabel"
      >
        Bilde
      </label>

      <input
        type="file"
        ref="file"
        style="display: none"
        @change="addImage"
        multiple
        accept="image/png, image/jpeg"
      />

      <!-- Button for adding an image -->
      <div class="inline-flex rounded-md shadow-sm">
        <div class="text-red-500 uppercase text-center">
          midlertidig fjernet
        </div>
        <!-- <button
          @click="$refs.file.click()"
          class="text-black bg-gray-200 hover:bg-grey-800 focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-grey-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800 disabled:opacity-50"
          :disabled="imageAdded"
        >
          Velg bilde
        </button> -->

        <!-- Button for removing an image -->
        <button
          class="w-1/12 ml-5 text-white bg-white-500 font-medium rounded-lg text-sm"
          v-show="imageAdded"
          @click="removeImage"
        >
          <img src="../../assets/removeIcon.png" alt="Remove icon image" />
        </button>
      </div>

      <!-- Div box for showing all chosen images -->
      <div v-for="image in group.images" :key="image" class="m-2">
        <img :src="image" class="w-1/2 inline" alt="Bilde av gjenstanden" />
      </div>
    </div>

    <!-- Save item button -->
    <div class="flex justify-center mt-10">
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
import { required, helpers, maxLength } from "@vuelidate/validators";
import { postNewgroup } from "@/utils/apiutil";

export default {
  name: "CreateNewGroup.vue",

  setup() {
    return { v$: useVuelidate() };
  },

  validations() {
    return {
      group: {
        name: {
          required: helpers.withMessage(
            () => "Navnt kan ikke være tom",
            required
          ),
          max: helpers.withMessage(
            () => `Navnet kan være på max 50 tegn`,
            maxLength(50)
          ),
        },
        place: {
          required: helpers.withMessage(
            () => "Stedsnavn kan ikke være tom",
            required
          ),
          max: helpers.withMessage(
            () => `Stednavn kan være på max 50 tegn`,
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
        },
        // select: {
        //   required: helpers.withMessage(() => `Velg en kategori`, required),
        // },
      },
    };
  },
  data() {
    return {
      group: {
        name: "",
        // select: null,
        description: "",
        images: [],
        // categories: ["Borettslag", "Idrettsklubb", "Fritidsklubb"],
        radio: null,
        place: "",
        visibility: 1,
      },
      imageThere: false,
    };
  },
  computed: {
    imageAdded: function () {
      if (this.imageThere) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    removeImage: function () {
      this.group.images.pop();
      this.imageThere = false;
      console.log("Bilder nå: " + this.group.images.length);
    },
    checkRadioButton: function (event) {
      this.group.radio = event.target.value;
      console.log(this.group.radio);

      if (this.group.radio == null || this.group.radio == "Åpen") {
        this.group.visibility = 1;
      } else {
        this.group.visibility = 0;
      }

      console.log("visibility: " + this.group.visibility);
    },
    checkValidation: function () {
      console.log("sjekker validering");

      this.v$.group.$touch();
      if (this.v$.group.$invalid) {
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
        console.log("Navn: " + this.group.name);
        console.log("Sted: " + this.group.place);
        console.log("Synlighet: " + this.group.radio);
        // console.log("Kategori: " + this.group.select);
        console.log("Beskrivelse: " + this.group.description);
        console.log("bilder: " + this.group.images);

        const groupInfo = {
          name: this.group.name,
          description: this.group.description,
          visibility: this.group.visibility,
          location: this.group.place,
          picture: "",
        };

        console.log(groupInfo);
        const postCreatedGroup = await postNewgroup(groupInfo);
        console.log(postCreatedGroup);
      }
    },

    addImage: function (event) {
      console.log(event.target.files);
      this.group.images.push(URL.createObjectURL(event.target.files[0]));
      console.log("antall bilder: " + this.group.images.length);
      this.imageThere = true;
      console.log("image: " + this.imageThere);
    },
  },
};
</script>
