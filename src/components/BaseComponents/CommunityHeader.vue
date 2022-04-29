<template>
  <div class="flex items-center justify-between mx-4">
    <div class="flex-1 min-w-0">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
      >
        {{ community.name }}
      </h2>
      <div
        class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6"
      >
        <div class="mt-2 flex items-center text-sm text-gray-500">
          <svg
            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ community.location }}
        </div>
      </div>
    </div>
    <div>
      <span class="hidden sm:block"> <!-- Legg dette til i button: v-if="adminStatus" -->

        <svg @click="toggle" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <CommunityHamburger v-if="hamburgerOpen" class="origin-top-right absolute right-0" :community-i-d="community.communityId"/> <!-- class="absolute" -->

      </span>
    </div>
  </div>
</template>

<script>
import CommunityHamburger from "@/components/CommunityComponents/CommunityHamburger";
export default {
  name: "CommunityHeader",
  components: {
    CommunityHamburger,
  },
  data(){
    return{
      hamburgerOpen: false,
    }
  },
  props: {
    adminStatus: Boolean,
    community: {
      communityId: Number,
      name: String,
      description: String,
      visibility: Number,
      location: String,
      picture: String,
    }
  },
  methods: {
    edit() {
      this.$emit("edit");
    },
    toggle: function (){
      if(this.hamburgerOpen){
        this.hamburgerOpen = false;
      }
      else{
        this.hamburgerOpen = true;
      }
    }
  },
};
</script>
