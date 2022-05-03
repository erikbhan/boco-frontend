<template>
  <section class="w-full px-5 py-4 mx-auto rounded-md">
    <CommunityHeader
      :admin-status="false"
      :community="community"
      class="mb-5"
    />

    <!-- Search field -->
    <div class="relative" id="searchComponent">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>

      <input
        type="text"
        id="searchInput"
        class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary-medium dark:focus:border-primary-medium focus:outline-none focus:ring"
        placeholder="Search"
        v-model="search"
      />
    </div>

    <!-- Item cards -->
    <div class="absolute inset-x-0 px-6 py-3">
      <div
        class="grid grid-flow-row-dense grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full place-items-center"
      >
        <ItemCard
          v-for="item in searchedItems"
          :key="item"
          :item="item"
          @click="goToItemInfoPage(item.listingID)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ItemCard from "@/components/ItemComponents/ItemCard";
import CommunityHeader from "@/components/BaseComponents/CommunityHeader";
import {
  GetCommunity,
  GetListingsInCommunity,
  getItemPictures,
} from "@/utils/apiutil";
export default {
  name: "SearchItemListComponent",

  components: {
    CommunityHeader,
    ItemCard,
  },

  computed: {
    searchedItems() {
      let filteredItems = [];

      filteredItems = this.items.filter(
        (p) =>
          p.title.toLowerCase().includes(this.search.toLowerCase()) ||
          p.address.toLowerCase().includes(this.search.toLowerCase()) ||
          p.pricePerDay === Number(this.search)
      );

      return filteredItems;
    },
  },
  created() {
    if (this.$store.state.user.token !== null) {
      this.isLoggedIn = true;
    }
  },
  data() {
    return {
      items: [],
      item: {
        listingID: 0,
        img: "",
        address: "",
        title: "",
        pricePerDay: 0,
      },
      search: "",
      communityID: -1,
      community: {},
    };
  },
  methods: {
    getCommunityFromAPI: async function () {
      this.communityID = await this.$router.currentRoute.value.params
        .communityID;
      this.community = await GetCommunity(this.communityID);
    },
    getListingsOfCommunityFromAPI: async function () {
      this.communityID = await this.$router.currentRoute.value.params
        .communityID;
      this.items = await GetListingsInCommunity(this.communityID);
      for (var i = 0; i < this.items.length; i++) {
        let images = await getItemPictures(this.items[i].listingID);
        console.log(images);
        if(images.length > 0) {
          this.items[i].img = images[0].picture;
        }
      }
    },
    goToItemInfoPage(item) {
      this.$router.push("/itempage/" + item);
    },
    getItemPictures: async function (itemid) {
      let res = await getItemPictures(itemid);
      return res;
    },
  },
  beforeMount() {
    this.getCommunityFromAPI(); //To get the id of the community before mounting the view
    this.getListingsOfCommunityFromAPI();
  },
};
</script>
