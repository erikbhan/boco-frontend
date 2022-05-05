<template>
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full p-4"
  >
    <!-- Component heading -->
    <h3 class="text-xl font-medium text-center text-primary-light mt-4 mb-8">
      Rediger gjenstand
    </h3>

    <!-- Title -->
    <div class="mb-6" :class="{ error: v$.updatedItem.title.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="titleLabel"
        >Tittel</label
      >
      <input
        type="text"
        id="title"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        v-model="v$.updatedItem.title.$model"
        required
      />

      <!-- error message for title-->
      <div
        class="text-error-medium"
        v-for="(error, index) of v$.updatedItem.title.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Category -->
    <div class="mb-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="selectCategoryLabel"
        >Kategori</label
      >
      <select
        v-model="v$.updatedItem.selectedCategory.$model"
        id="categories"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
      >
        <option class="text-gray-400" value="" disabled>
          Velg en kategori
        </option>
        <option
          :selected="category == updatedItem.selectedCategory"
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
        v-for="(error, index) of v$.updatedItem.selectedCategory.$errors"
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
        class="overflow-auto w-full h-32 mt-2 text-base list-none bg-white rounded divide-y divide-gray-100 dark:bg-gray-700"
      >
        <ul class="py-1" aria-labelledby="dropdownDefault">
          <li>
            <div
              class="form-check"
              v-for="community in communities"
              :key="community"
            >
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary-medium focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                :checked="isInSelectedCommunity(community.communityId)"
                :value="community.communityId"
                @change="onChangeCommunity($event)"
              />
              <label class="form-check-label inline-block text-gray-800">
                {{ community.name }}
              </label>
            </div>
          </li>
        </ul>
      </div>
      <label class="text-error-medium text-sm block">{{
        communityErrorMessage
      }}</label>
    </div>

    <!-- price -->
    <div
      class="mb-6 mt-4"
      :class="{ error: v$.updatedItem.price.$errors.length }"
    >
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="priceLabel"
        >Pris</label
      >
      <input
        type="number"
        v-model="v$.updatedItem.price.$model"
        id="price"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        required
      />

      <!-- error message for price -->
      <div
        class="text-error"
        v-for="(error, index) of v$.updatedItem.price.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Description -->
    <div
      class="mb-6"
      :class="{ error: v$.updatedItem.description.$errors.length }"
    >
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="descriptionLabel"
        >Beskrivelse</label
      >
      <textarea
        id="description"
        rows="4"
        v-model="v$.updatedItem.description.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        required
      ></textarea>

      <!-- error message for description -->
      <div
        class="text-error"
        v-for="(error, index) of v$.updatedItem.description.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Address -->
    <div class="mb-6" :class="{ error: v$.updatedItem.address.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="addressLabel"
        >Adresse</label
      >
      <input
        type="text"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        v-model="v$.updatedItem.address.$model"
        id="adress"
        required
      />

      <!-- error message for address-->
      <div
        class="text-error"
        v-for="(error, index) of v$.updatedItem.address.$errors"
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

      <div v-for="image in updatedItem.images" :key="image" class="m-2">
        <img :src="image" class="w-2/5 inline" alt="Bilde av gjenstanden" />
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
import Button from "@/components/BaseComponents/ColoredButton";
import ListingService from "@/services/listing.service";
import CommunityService from "@/services/community.service";
import { parseCurrentUser } from "@/utils/token-utils";

import {
  required,
  helpers,
  maxLength,
  between,
  minLength,
} from "@vuelidate/validators";

export default {
  name: "EditNewItem",

  components: {
    Button,
  },

  setup() {
    return { v$: useVuelidate() };
  },

  validations() {
    return {
      updatedItem: {
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
        selectedCategory: {
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
      updatedItem: {
        title: "",
        description: "",
        address: "",
        price: "",
        category: "",
        selectedCategory: "",
        selectedCategories: [],
        images: [],
        userId: -1,
        selectedCommunityId: -1,
        selectedCommunities: [],
      },
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
      initialItem: {},
      communities: [],
      communityErrorMessage: "",
      images: [],
    };
  },

  methods: {
    checkValidation() {
      console.log(this.updatedItem);
      this.v$.updatedItem.$touch();
      if (
        this.v$.updatedItem.$invalid ||
        this.updatedItem.selectedCommunities.length === 0
      ) {
        if (this.updatedItem.selectedCommunities.length === 0) {
          this.communityErrorMessage = "Velg gruppe/grupper";
        }
        return false;
      }
      return true;
    },

    async saveClicked() {
      if (this.checkValidation()) {
        let itemInfo = {
          listingID: parseInt(this.initialItem.listingID),
          title: this.updatedItem.title,
          description: this.updatedItem.description,
          pricePerDay: this.updatedItem.price,
          address: this.updatedItem.address,
          userID: this.updatedItem.userId,
          categoryNames: this.updatedItem.selectedCategories,
          communityIDs: this.updatedItem.selectedCommunities,
        };
        await ListingService.putItem(itemInfo);
        this.$router.push("/itempage/" + this.initialItem.listingID);
      }
    },

    addImage(event) {
      this.updatedItem.images.push(URL.createObjectURL(event.target.files[0]));
    },

    onChangeCommunity(e) {
      console.log(e);
      this.selectedCommunityId = e.target.value;
      let alreadyInGroupList = false;

      for (let i = 0; i <= this.updatedItem.selectedCommunities.length; i++) {
        if (
          this.selectedCommunityId == this.updatedItem.selectedCommunities[i]
        ) {
          const index = this.updatedItem.selectedCommunities.indexOf(
            this.selectedCommunityId
          );
          if (index > -1) {
            this.item.selectedCommunities.splice(index, 1);
          }
          alreadyInGroupList = true;
        }
      }

      if (!alreadyInGroupList) {
        this.updatedItem.selectedCommunities.push(this.selectedCommunityId);
        this.communityErrorMessage = "";
      }
    },

    isInSelectedCommunity(id) {
      for (let i in this.updatedItem.selectedCommunities) {
        if (this.updatedItem.selectedCommunities[i] == id) {
          return true;
        }
      }
      return false;
    },
  },

  async beforeMount() {
    let itemID = await this.$router.currentRoute.value.params.id;
    let item = await ListingService.getItem(itemID);

    console.log(item);

    // Check if user is the owner of the item
    let userID = await parseCurrentUser().userId;
    if (item.userID == userID) {
      this.$router.push(this.$router.options.history.state.back);
    }

    this.initialItem = item;
    this.communities = await CommunityService.getUserCommunities();
    this.images = ListingService.getItemPictures(itemID);

    let initialCategories = [];
    for (let i in this.initialItem.categoryNames) {
      initialCategories.push(this.initialItem.categoryNames[i]);
    }
    let selectedCategory =
      initialCategories.length > 0 ? initialCategories[0] : "";

    let initialCommunities = [];
    for (let i in this.initialItem.communityIDs) {
      initialCommunities.push(this.initialItem.communityIDs[i]);
    }

    this.updatedItem = {
      title: this.initialItem.title,
      description: this.initialItem.description,
      address: this.initialItem.address,
      price: this.initialItem.pricePerDay,
      selectedCategories: initialCategories,
      selectedCategory: selectedCategory,
      images: [],
      userId: this.initialItem.userID,
      selectedCommunityId: 0,
      selectedCommunities: initialCommunities,
    };
    console.log(this.updatedItem);
  },
};
</script>
