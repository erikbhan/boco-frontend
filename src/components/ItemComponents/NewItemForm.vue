<template>
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full p-4"
  >
    <!-- Component heading -->
    <h3 class="text-xl font-medium text-center text-primary-light mt-4 mb-8">
      Opprett ny utleie
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
        class="text-error-medium"
        v-for="(error, index) of v$.item.title.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
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
          Velg en kategori
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
        class="text-error-medium"
        v-for="(error, index) of v$.item.select.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Grupper -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-900 dark:text-gray-400"
        >Grupper</label
      >
      <div
        class="overflow-auto w-full max-h-32 mt-2 text-base list-none bg-white rounded divide-y divide-gray-100 dark:bg-gray-700"
      >
        <ul class="py-1" aria-labelledby="dropdownDefault">
          <li>
            <div class="form-check" v-for="group in groups" :key="group">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary-medium focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                :value="group.communityId"
                @change="onChangeGroup($event)"
              />
              <label class="form-check-label inline-block text-gray-800">
                {{ group.name }}
              </label>
            </div>
          </li>
        </ul>
      </div>
      <!-- Error message for community -->
      <label class="text-error-medium text-sm block">{{
        groupErrorMessage
      }}</label>
    </div>

    <!-- price -->
    <div class="mb-6 mt-4" :class="{ error: v$.item.price.$errors.length }">
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
        class="text-error-medium"
        v-for="(error, index) of v$.item.price.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
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
        class="text-error-medium"
        v-for="(error, index) of v$.item.description.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Address -->
    <div class="mb-6" :class="{ error: v$.item.address.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="addressLabel"
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
        class="text-error-medium"
        v-for="(error, index) of v$.item.address.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
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
        Bilder (bildene må være .png)
      </label>

      <input
        type="file"
        ref="file"
        style="display: none"
        @change="addImage"
        multiple
        accept="image/png"
      />

      <Button :text="'Velg bilde'" @click="$refs.file.click()" />

      <div v-for="image in item.images" :key="image" class="m-2">
        <img :src="image" class="w-2/5 inline" alt="Bilde av gjenstanden" /> <!-- @click="removeImage(image)" -->
      </div>
    </div>

    <!-- Save item button -->
    <div class="float-right">
      <Button :text="'Lagre'" @click="saveClicked" id="saveButton" />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { parseUserFromToken } from "@/utils/token-utils";
import {
  postNewItem,
  getMyGroups,
  postNewImageCommunity,
  PostImagesArrayToListing,
} from "@/utils/apiutil";
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
        selectedGroupId: -1,
        selectedGroups: [],
        imagesToSend: [],
      },
      //Kategorier skal legges inn ved api/hente fra db, her må det endres etterhvert
      categories: [
        "Antikviteter og kunst",
        "Dyr og utstyr",
        "Elektronikk og hvitevarer",
        "Foreldre og barn",
        "Fritid, hobby og underholdning",
        "Hage, oppussing og hus",
        "Klær, kosmetikk og tilbehør",
        "Møbler og interiør",
        "Næringsvirksomhet",
        "Sport og friluftsliv",
        "Utstyr til bil, båt og MC",
      ],
      groups: [],
      groupErrorMessage: "",
    };
  },
  methods: {
    checkValidation: function () {
      this.v$.item.$touch();
      if (this.v$.item.$invalid || this.item.selectedGroups.length === 0) {
        if (this.item.selectedGroups.length === 0) {
          this.groupErrorMessage = "Velg gruppe/grupper";
        }
        return false;
      }
      return true;
    },

    async saveClicked() {
      if (this.checkValidation()) {
        this.checkUser();

        const itemInfo = {
          title: this.item.title,
          description: this.item.description,
          pricePerDay: this.item.price,
          address: this.item.address,
          userID: this.item.userId,
          categoryNames: [this.item.select],
          communityIDs: this.item.selectedGroups,
        };
        await postNewItem(itemInfo);

        await PostImagesArrayToListing(this.item.imagesToSend);

        this.$router.push("/");
      }
    },

    checkUser: async function () {
      let user = parseUserFromToken(this.$store.state.user.token);
      this.item.userId = parseInt(user.accountId);
    },

    addImage: async function (event) {
      var that = this;
      let image = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const res = fileReader.result;
        const id = await postNewImageCommunity(res);
        
        const API_URL = process.env.VUE_APP_BASEURL;
        that.item.imagesToSend.push(API_URL + "images/" + id);
        that.item.images.push(API_URL + "images/" + id)
      };
      fileReader.readAsArrayBuffer(image);
    },

    getGroups: async function () {
      this.groups = await getMyGroups();
    },

    onChangeGroup: function (e) {
      this.selectedGroupId = e.target.value;
      let alreadyInGroupList = false;

      for (let i = 0; i <= this.item.selectedGroups.length; i++) {
        if (this.selectedGroupId == this.item.selectedGroups[i]) {
          const index = this.item.selectedGroups.indexOf(this.selectedGroupId);
          if (index > -1) {
            this.item.selectedGroups.splice(index, 1);
          }
          alreadyInGroupList = true;
        }
      }

      if (!alreadyInGroupList) {
        this.item.selectedGroups.push(this.selectedGroupId);
        this.groupErrorMessage = "";
      }
    },

    removeImage(image) {
      let newImages = [];
      for (let i in this.item.images) {
        if (this.item.images[i] != image) {
          newImages.push(this.item.images[i]);
        }
      }
      this.item.images = newImages;

    },
  },
  beforeMount() {
    this.getGroups();
  },
};
</script>
