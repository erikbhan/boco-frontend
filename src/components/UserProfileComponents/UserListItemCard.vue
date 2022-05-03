<template>
  <div
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50 flex items-center p-4"
  >
    <div class="h-10 w-10 flex flex-col justify-center items-center mr-4">
      <router-link :to="'/profile/' + user.userId">
        <img alt="profil" src="../../assets/defaultUserProfileImage.jpg" />
      </router-link>
    </div>
    <div class="flex-1 pl-1">
      <div class="font-medium dark:text-white">
        {{ user.firstName }} {{ user.lastName }}
      </div>
    </div>
    <div class="hidden md:block flex-auto">
      <rating-component :rating="rating" :ratingType="'Gjennomsnitts rating'" />
    </div>
    <div class="flex flex-row justify-center">
      <button
        v-if="!admin"
        class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-primary-medium rounded-md hover:bg-primary-light focus:outline-none focus:ring focus:ring-opacity-80"
      >
        Åpne chat
      </button>
      <button
        v-if="admin"
        class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Fjern bruker
      </button>
    </div>
  </div>
</template>

<script>
import { getAverageRating } from "@/utils/apiutil";
import RatingComponent from "./Rating.vue";

export default {
  name: "UserListItem",
  data() {
    return {
      rating: this.getRating(),
    };
  },
  components: {
    RatingComponent,
  },
  props: {
    user: Object,
    admin: Boolean,
  },
  methods: {
    getProfilePicture() {
      if (this.user.picture != "") {
        return this.user.picture;
      }
      return "../assets/defaultUserProfileImage.jpg";
    },
    async getRating() {
      this.rating = await getAverageRating(this.user.userId);
    },
  },
  beforeMount() {
    this.getRating();
  },
};
</script>
