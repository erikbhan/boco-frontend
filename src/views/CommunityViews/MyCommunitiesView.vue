<template>
  <!-- My communities, with pagination -->
  <div v-if="loggedIn">
    <div class="flex flex-row p-4 relative">
      <div class="text-xl md:text-2xl text-gray-600 font-medium w-full">
        Mine grupper
      </div>
      <UserAddIcon
          class="cursor-pointer max-h-6 max-w-6 float-right grow text-primary-dark"
          @click="$router.push('/newCommunity')"
          alt="Opprett ny gruppe"
      />
    </div>
    <CommunityList :communities="visibleMyCommunities" :member="true"/>

    <!-- pagination my communities -->
    <div class="flex justify-center">
      <PaginationTemplate
          v-bind:items="myCommunities"
          v-on:page:update="updatePageMyCommunities"
          v-bind:currentPage="currentPageMyCommunities"
          v-bind:pageSize="pageSizeMyCommunities"
          class="mt-10 mb-5"
      />
    </div>
  </div>

  <!-- Public communities, with search and pagination -->
  <p class="text-xl md:text-2xl text-gray-600 font-medium w-full p-4">
    Offentlige grupper
  </p>
  <!-- Search field -->
  <div class="relative mt-1 mx-2" id="searchComponent">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      <div class="w-5 h-5 text-gray-400">
        <SearchIcon/>
      </div>
    </span>

    <input
        type="text"
        id="searchInput"
        class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary-medium dark:focus:border-primary-medium focus:outline-none focus:ring"
        placeholder="Search"
        v-model="search"
        @change="searchWritten"
    />
  </div>

  <!-- Public communities list, two lists, one for when it's searched and one for pagination -->

  <!-- pagination Public communities -->
</template>

<script>
import CommunityList from "@/components/CommunityComponents/CommunityList.vue";
import {UserAddIcon, SearchIcon} from "@heroicons/vue/outline";
import PaginationTemplate from "@/components/BaseComponents/PaginationTemplate";
import CommunityService from "@/services/community.service";

export default {
  name: "HomeView",
  data() {
    return {
      loggedIn: false,
      myCommunities: [],
      search: "",
      showSearched: false,
      showPaginated: true,

      //Variables connected to pagination
      currentPageMyCommunities: 0,
      pageSizeMyCommunities: 5,
      visibleMyCommunities: [],
    };
  },
  components: {
    CommunityList,
    UserAddIcon,
    PaginationTemplate,
    SearchIcon,
  },
  methods: {
    //Pagination
    updatePageMyCommunities(pageNumber) {
      this.currentPageMyCommunities = pageNumber;
      this.updateVisibleCommunities();
    },
    updateVisibleCommunities() {
      this.visibleMyCommunities = this.myCommunities.slice(
          this.currentPageMyCommunities * this.pageSizeMyCommunities,
          this.currentPageMyCommunities * this.pageSizeMyCommunities +
          this.pageSizeMyCommunities
      );

      // if we have 0 visible communities, go back a page
      if (
          this.visibleMyCommunities.length === 0 &&
          this.currentPageMyCommunities > 0
      ) {
        this.updatePageMyCommunities(this.currentPageMyCommunities - 1);
      }
    },
    searchWritten() {
      //This method triggers when search input field is changed
      this.showPaginated = this.search.length < 1;
      this.showSearched = this.search.length > 0;
    },
    async load() {
      this.loggedIn = this.$store.state.user.token !== null;
      if (!this.loggedIn) return;
      this.myCommunities = await CommunityService.getUserCommunities();
    },
  },
};
</script>
