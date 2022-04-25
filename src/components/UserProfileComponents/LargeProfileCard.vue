<template>
  <div
    class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <div v-show="isCurrentUser" class="flex justify-end px-4 pt-4">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          ></path>
        </svg>
      </button>

      <div
        id="dropdown"
        class="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="top"
        style="
          position: absolute;
          inset: auto auto 0px 0px;
          margin: 0px;
          transform: translate3d(653.6px, 2976.8px, 0px);
        "
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <router-link
              to=""
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Mine gjenstander</router-link
            >
          </li>
          <li>
            <router-link
              to=""
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Mine grupper
            </router-link>
          </li>
          <li>
            <router-link
              to=""
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Leiehistorikk</router-link
            >
          </li>
          <li>
            <router-link
              to=""
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Endre passord</router-link
            >
          </li>
          <li>
            <router-link
              to=""
              class="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Slett bruker</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col items-center pb-10">
      <img
        class="mb-3 w-24 h-24 rounded-full shadow-lg"
        :src="getProfilePicture()"
        alt="Profile picture"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {{ user.firstName }} {{ user.lastName }}
      </h5>
      <div>
        <rating-component :rating="renterRating" :ratingType="'Leietaker'" />
        <rating-component :rating="ownerRating" :ratingType="'Utleier'" />
      </div>

      <div v-show="!isCurrentUser" class="flex mt-4 space-x-3 lg:mt-6">
        <a
          href="#"
          class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >Åpne chat</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import RatingComponent from "@/components/UserProfileComponents/RatingComponent.vue";
import { parseUserFromToken } from "@/utils/token-utils";
import { getUser /* getRenterRating, getOwnerRating */ } from "@/utils/apiutil";
import router from "@/router";

export default {
  name: "LargeProfileCard",
  data() {
    return {
      user: this.getUser(),
      renterRating: 3, //getRenterRating(this.userID),
      ownerRating: 5, //getOwnerRating(this.userID),
    };
  },
  computed: {
    isCurrentUser() {
      if (this.user.id == parseUserFromToken().id) return true;
      return false;
    },
  },
  components: {
    RatingComponent,
  },
  methods: {
    getUser() {
      let id = router.currentRoute.value.params.id;
      if (this.isCurrentUser) {
        return parseUserFromToken();
      }
      return getUser(id);
    },
    getProfilePicture() {
      if (this.user.picture == "") {
        return "../assets/defaultUserProfileImage.jpg";
      }
      return this.user.picture;
    },
  },
};
</script>
